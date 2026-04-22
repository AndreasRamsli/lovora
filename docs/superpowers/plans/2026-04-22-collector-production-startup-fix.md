# Collector Production Startup Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the split Hetzner `collector` service start reliably in production by removing its dependency on a dev-only package from the runtime boot path.

**Architecture:** The root cause is a mismatch between the production image contents and the command used to launch the collector service. The fix is to make the Compose runtime invoke the collector entrypoint directly with Node instead of routing through a package script that depends on `cross-env`, then add a regression test that locks in the production-safe boot command.

**Tech Stack:** Docker Compose, Node.js, Python `unittest`, YAML config, npm package scripts

---

## File Structure

- Modify: `deploy/hetzner/docker-compose.yml`
  - Owns the production runtime topology and service commands for the Hetzner deployment.
- Modify: `deploy/hetzner/tests/test_runtime_split.py`
  - Owns regression coverage for the split `server`/`collector` runtime configuration.
- Inspect only: `collector/package.json`
  - Confirms that `start` depends on `cross-env`, which is only present in `devDependencies`.

This fix should stay narrow. Do not restructure the collector package, do not move dependencies between `dependencies` and `devDependencies`, and do not add a shell workaround script. The production runtime should boot with binaries guaranteed to exist in the production image.

### Task 1: Reproduce And Lock Down The Regression

**Files:**
- Modify: `deploy/hetzner/tests/test_runtime_split.py`
- Inspect: `collector/package.json:12-16`
- Inspect: `collector/package.json:52-60`

- [ ] **Step 1: Write the failing test**

Edit `deploy/hetzner/tests/test_runtime_split.py` so the runtime split test asserts that the collector service uses a direct Node command and explicitly rejects the previous `yarn start` form:

```python
from pathlib import Path
import re
import unittest


REPO_ROOT = Path(__file__).resolve().parents[3]
DOCKER_COMPOSE = REPO_ROOT / "deploy" / "hetzner" / "docker-compose.yml"
SUPERVISORD = REPO_ROOT / "deploy" / "hetzner" / "supervisord.conf"


class RuntimeSplitTests(unittest.TestCase):
    def test_docker_compose_splits_server_and_collector_services(self):
        text = DOCKER_COMPOSE.read_text()
        self.assertRegex(text, r"(?m)^services:\n")
        self.assertRegex(text, r"(?m)^  server:\n")
        self.assertRegex(text, r"(?m)^  collector:\n")
        self.assertNotRegex(text, r"(?m)^  app:\n")
        self.assertRegex(
            text,
            re.escape('command: "cd /app/collector && exec node index.js"'),
        )
        self.assertNotRegex(text, re.escape("exec yarn start"))

    def test_supervisord_only_runs_server_program(self):
        text = SUPERVISORD.read_text()
        self.assertRegex(text, r"(?m)^\[program:anythingllm\]\n")
        self.assertNotRegex(text, r"(?m)^\[program:collector\]\n")
        self.assertNotRegex(text, re.escape("cd /app/collector"))


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

Expected: FAIL in `test_docker_compose_splits_server_and_collector_services` because Compose still contains:

```yaml
command: "cd /app/collector && exec yarn start"
```

and does not yet contain:

```yaml
command: "cd /app/collector && exec node index.js"
```

- [ ] **Step 3: Confirm the root cause in the collector package**

Inspect `collector/package.json` and verify the production risk before changing runtime config:

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development nodemon --ignore hotdir --ignore storage --trace-warnings index.js",
  "start": "cross-env NODE_ENV=production node index.js"
},
"devDependencies": {
  "cross-env": "^7.0.3"
}
```

Root-cause note: the Hetzner runtime image installs production dependencies only, so `cross-env` is not guaranteed to exist when the `collector` service starts in production.

- [ ] **Step 4: Commit the failing test**

```bash
git add deploy/hetzner/tests/test_runtime_split.py
git commit -m "test: cover collector production boot command"
```

### Task 2: Fix The Production Boot Path At The Source

**Files:**
- Modify: `deploy/hetzner/docker-compose.yml`
- Test: `deploy/hetzner/tests/test_runtime_split.py`

- [ ] **Step 1: Write the minimal implementation**

Edit the `collector` service in `deploy/hetzner/docker-compose.yml` to invoke Node directly:

```yaml
  collector:
    <<: *lovora-runtime
    entrypoint: ["/bin/bash", "-lc"]
    command: "cd /app/collector && exec node index.js"
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://127.0.0.1:8888/ >/dev/null || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 10
      start_period: 20s
```

Do not add `cross-env` to production dependencies and do not wrap the command in another script. The production boot path should only depend on executables shipped in the production image.

- [ ] **Step 2: Run test to verify it passes**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

Expected:

```text
test_docker_compose_splits_server_and_collector_services ... ok
test_supervisord_only_runs_server_program ... ok
```

- [ ] **Step 3: Inspect the diff for accidental config drift**

Run:

```bash
git diff -- deploy/hetzner/docker-compose.yml deploy/hetzner/tests/test_runtime_split.py
```

Expected: only these two intentional changes are present:
- the collector command changed from `exec yarn start` to `exec node index.js`
- the runtime split test now asserts the direct Node command and rejects `exec yarn start`

- [ ] **Step 4: Commit the fix**

```bash
git add deploy/hetzner/docker-compose.yml deploy/hetzner/tests/test_runtime_split.py
git commit -m "fix: boot collector without dev-only tooling"
```

### Task 3: Production Validation

**Files:**
- Inspect: `deploy/hetzner/docker-compose.yml`
- Inspect: `collector/package.json`
- Test: `deploy/hetzner/tests/test_runtime_split.py`

- [ ] **Step 1: Verify the production/runtime contract explicitly**

Check that the final state matches this contract:

```text
deploy/hetzner/docker-compose.yml
  collector command -> direct node process

collector/package.json
  start script -> may still use cross-env for package-manager entrypoints

production image
  does not need cross-env to boot collector service
```

This is the intended design: developer conveniences may stay in package scripts, but deployment config must not require dev-only tooling to start critical infrastructure.

- [ ] **Step 2: Re-run the targeted regression test**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

Expected: PASS

- [ ] **Step 3: Record the verification command in the PR or change summary**

Use this exact verification line in the implementation summary:

```text
Verified with: python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

- [ ] **Step 4: Commit any final cleanup if needed**

If no further changes were needed after verification, do not create an extra cleanup commit. Keep the history to the two commits above.

## Self-Review

- Spec coverage: This plan covers the full root-cause fix for the collector production boot failure, including reproducing the regression, validating the cause in `collector/package.json`, fixing the Compose runtime command, and adding regression coverage.
- Placeholder scan: No placeholders, TODOs, or “similar to above” shortcuts remain.
- Type consistency: All file paths, commands, and asserted command strings are consistent across tasks.

