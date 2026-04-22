# Rollout Recovery And Image Pinning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Hetzner rollouts recoverable by automatically restoring the prior healthy release when smoke checks fail, while also replacing the mutable `latest` runtime image with explicit per-release image references that the host can actually roll back to.

**Architecture:** The fix has two linked parts. First, `rollout.sh` must become transactional: build a uniquely tagged candidate image, deploy it, run smoke checks, and if that candidate fails, redeploy the previously active image and verify the stack is healthy again before exiting non-zero. Second, the Compose bundle must stop relying on `lovora-hetzner-runtime:latest` and instead consume an explicit `LOVORA_RUNTIME_IMAGE` value so the rollout script can switch between stable local image references deterministically.

**Tech Stack:** Bash, Docker Compose, Docker image tags, Python `unittest`, shell-based integration tests, Markdown runbooks

---

## File Structure

- Modify: `deploy/hetzner/docker-compose.yml`
  - Replace the mutable hard-coded runtime image reference with an explicit environment-driven image reference.
- Modify: `deploy/hetzner/scripts/rollout.sh`
  - Own the rollout transaction: build candidate image, detect current image, deploy candidate, run smoke, roll back on failure, and persist active release state.
- Create: `deploy/hetzner/tests/test_rollout_script.py`
  - Own regression coverage for rollout failure recovery and explicit runtime image selection.
- Modify: `ops/runbooks/deploy.md`
  - Document that rollout now performs automatic recovery on failed smoke and records the active runtime image reference.
- Modify: `ops/runbooks/rollback.md`
  - Document where the active image reference lives and how operators use it for release rollback.

Keep this plan narrow. Do not redesign the whole deploy stack, do not add registries, and do not add a workaround operator checklist in place of real rollback behavior. The rollout script itself must become the source of truth for deploy-time recovery.

### Task 1: Lock In The Rollout Failure Modes With Tests

**Files:**
- Create: `deploy/hetzner/tests/test_rollout_script.py`
- Inspect: `deploy/hetzner/scripts/rollout.sh`
- Inspect: `deploy/hetzner/docker-compose.yml:3-10`

- [ ] **Step 1: Write the failing tests**

Create `deploy/hetzner/tests/test_rollout_script.py` with two tests:

1. `test_rollout_redeploys_prior_runtime_image_when_candidate_smoke_fails`
2. `test_docker_compose_uses_explicit_runtime_image_reference`

Use this starting file:

```python
import os
import stat
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
ROLLOUT_SCRIPT = REPO_ROOT / "deploy" / "hetzner" / "scripts" / "rollout.sh"
DOCKER_COMPOSE = REPO_ROOT / "deploy" / "hetzner" / "docker-compose.yml"


class RolloutScriptTests(unittest.TestCase):
    def test_docker_compose_uses_explicit_runtime_image_reference(self):
        text = DOCKER_COMPOSE.read_text()
        self.assertIn("image: ${LOVORA_RUNTIME_IMAGE:-lovora-hetzner-runtime:latest}", text)
        self.assertNotIn("image: lovora-hetzner-runtime:latest", text)

    def test_rollout_redeploys_prior_runtime_image_when_candidate_smoke_fails(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            state_dir = data_root / "deploy"
            state_dir.mkdir(parents=True)
            state_file = state_dir / "release-state.env"
            state_file.write_text(
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:stable-old\n"
            )

            rollout_script = script_dir / "rollout.sh"
            rollout_script.write_text(ROLLOUT_SCRIPT.read_text())
            rollout_script.chmod(0o755)

            self._write_executable(
                script_dir / "preflight.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "preflight:$*" >> "{log_path}"
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$LOVORA_RUNTIME_IMAGE" >> "{log_path}"
                    if [[ "$LOVORA_RUNTIME_IMAGE" == "lovora-hetzner-runtime:git-deadbeef" ]]; then
                      exit 1
                    fi
                    exit 0
                    """
                ),
            )
            self._write_executable(
                fake_bin / "git",
                textwrap.dedent(
                    """\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "deadbeef"
                    """
                ),
            )
            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$LOVORA_RUNTIME_IMAGE:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            calls = log_path.read_text().splitlines()
            self.assertIn(
                "docker::build -f deploy/hetzner/Dockerfile -t lovora-hetzner-runtime:git-deadbeef ../..",
                calls,
            )
            self.assertIn(
                "docker:lovora-hetzner-runtime:git-deadbeef:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertIn(
                "docker:lovora-hetzner-runtime:stable-old:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertEqual(
                state_file.read_text(),
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:stable-old\n",
            )

    def _write_executable(self, path: Path, content: str) -> None:
        path.write_text(content)
        path.chmod(path.stat().st_mode | stat.S_IEXEC)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_rollout_script -v
```

Expected:
- `test_docker_compose_uses_explicit_runtime_image_reference` fails because `docker-compose.yml` still contains `image: lovora-hetzner-runtime:latest`
- `test_rollout_redeploys_prior_runtime_image_when_candidate_smoke_fails` fails because `rollout.sh` does not build an explicit image ref, does not redeploy the prior image on smoke failure, and does not persist any release state

- [ ] **Step 3: Commit the failing tests**

```bash
git add deploy/hetzner/tests/test_rollout_script.py
git commit -m "test: cover recoverable hetzner rollouts"
```

### Task 2: Replace Mutable `latest` With Explicit Runtime Images

**Files:**
- Modify: `deploy/hetzner/docker-compose.yml`
- Test: `deploy/hetzner/tests/test_rollout_script.py`

- [ ] **Step 1: Change Compose to consume an explicit runtime image**

Update the shared runtime block in `deploy/hetzner/docker-compose.yml`:

```yaml
x-lovora-runtime: &lovora-runtime
  build:
    context: ../..
    dockerfile: deploy/hetzner/Dockerfile
    args:
      ARG_UID: ${UID:-1000}
      ARG_GID: ${GID:-1000}
  image: ${LOVORA_RUNTIME_IMAGE:-lovora-hetzner-runtime:latest}
  cap_add:
    - SYS_ADMIN
```

This keeps local backward compatibility for the first deploy on an old host, but removes the hard-coded mutable image from the actual Compose contract.

- [ ] **Step 2: Run the focused Compose test**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_rollout_script.RolloutScriptTests.test_docker_compose_uses_explicit_runtime_image_reference -v
```

Expected:

```text
test_docker_compose_uses_explicit_runtime_image_reference ... ok
```

- [ ] **Step 3: Commit the Compose change**

```bash
git add deploy/hetzner/docker-compose.yml deploy/hetzner/tests/test_rollout_script.py
git commit -m "fix: pin hetzner runtime image by release"
```

### Task 3: Make Rollout Transactional

**Files:**
- Modify: `deploy/hetzner/scripts/rollout.sh`
- Test: `deploy/hetzner/tests/test_rollout_script.py`

- [ ] **Step 1: Implement release-state helpers and deterministic image selection**

Replace `deploy/hetzner/scripts/rollout.sh` with this structure:

```bash
#!/usr/bin/env bash
set -euo pipefail

error() {
  echo "Error: $*" >&2
}

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    error "missing required command: $cmd"
    exit 1
  fi
}

load_release_state() {
  local state_file="$1"
  CURRENT_RUNTIME_IMAGE=""

  if [[ -f "$state_file" ]]; then
    # shellcheck disable=SC1090
    source "$state_file"
  fi
}

detect_running_runtime_image() {
  local compose_file="$1"
  local container_id

  container_id="$(docker compose -f "$compose_file" ps -q server 2>/dev/null || true)"
  if [[ -z "$container_id" ]]; then
    return 0
  fi

  docker inspect --format '{{.Config.Image}}' "$container_id" 2>/dev/null || true
}

persist_release_state() {
  local state_file="$1"
  local runtime_image="$2"

  install -d -m 755 "$(dirname "$state_file")"
  cat >"$state_file" <<EOF
CURRENT_RUNTIME_IMAGE=$runtime_image
EOF
}

build_runtime_image() {
  local root_dir="$1"
  local runtime_image="$2"

  docker build \
    -f "$root_dir/deploy/hetzner/Dockerfile" \
    -t "$runtime_image" \
    "$root_dir"
}

deploy_runtime_image() {
  local compose_file="$1"
  local runtime_image="$2"

  LOVORA_RUNTIME_IMAGE="$runtime_image" \
    docker compose -f "$compose_file" up -d --no-build
}

run_smoke_checks() {
  local smoke_script="$1"
  local runtime_image="$2"

  LOVORA_RUNTIME_IMAGE="$runtime_image" bash "$smoke_script"
}
```

- [ ] **Step 2: Implement rollback-on-failed-smoke behavior**

Complete `main()` with this control flow:

```bash
main() {
  local root_dir hetzner_dir compose_file smoke_script state_file data_root release_id
  local candidate_runtime_image current_runtime_image

  root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
  hetzner_dir="$root_dir/deploy/hetzner"
  compose_file="$hetzner_dir/docker-compose.yml"
  smoke_script="$hetzner_dir/scripts/smoke.sh"
  data_root="${LOVORA_DATA_ROOT:-$root_dir/.data/hetzner}"
  state_file="$data_root/deploy/release-state.env"

  require_command docker
  require_command git

  "$hetzner_dir/scripts/preflight.sh"

  load_release_state "$state_file"
  if [[ -z "${CURRENT_RUNTIME_IMAGE:-}" ]]; then
    CURRENT_RUNTIME_IMAGE="$(detect_running_runtime_image "$compose_file")"
  fi
  current_runtime_image="${CURRENT_RUNTIME_IMAGE:-}"

  release_id="git-$(git -C "$root_dir" rev-parse --short=8 HEAD)"
  candidate_runtime_image="lovora-hetzner-runtime:$release_id"

  build_runtime_image "$root_dir" "$candidate_runtime_image"
  deploy_runtime_image "$compose_file" "$candidate_runtime_image"
  docker compose -f "$compose_file" ps

  if run_smoke_checks "$smoke_script" "$candidate_runtime_image"; then
    persist_release_state "$state_file" "$candidate_runtime_image"
    echo "Rollout complete."
    return 0
  fi

  error "candidate rollout failed; attempting rollback"

  if [[ -n "$current_runtime_image" && "$current_runtime_image" != "$candidate_runtime_image" ]]; then
    deploy_runtime_image "$compose_file" "$current_runtime_image"
    docker compose -f "$compose_file" ps
    if run_smoke_checks "$smoke_script" "$current_runtime_image"; then
      persist_release_state "$state_file" "$current_runtime_image"
      error "rollback to prior runtime image succeeded"
      exit 1
    fi
    error "rollback smoke checks failed"
    exit 1
  fi

  error "no prior runtime image available for rollback"
  exit 1
}

main "$@"
```

The key design rule is: rollout success updates `CURRENT_RUNTIME_IMAGE`, rollout failure restores the prior one if possible, and the script still exits non-zero so automation sees the deploy as failed.

- [ ] **Step 3: Run the rollout regression test**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_rollout_script.RolloutScriptTests.test_rollout_redeploys_prior_runtime_image_when_candidate_smoke_fails -v
```

Expected:

```text
test_rollout_redeploys_prior_runtime_image_when_candidate_smoke_fails ... ok
```

- [ ] **Step 4: Run the whole rollout test file**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_rollout_script -v
```

Expected: both rollout tests pass.

- [ ] **Step 5: Commit the transactional rollout implementation**

```bash
git add deploy/hetzner/scripts/rollout.sh deploy/hetzner/tests/test_rollout_script.py deploy/hetzner/docker-compose.yml
git commit -m "fix: make hetzner rollouts recoverable"
```

### Task 4: Update Operator Runbooks To Match Reality

**Files:**
- Modify: `ops/runbooks/deploy.md`
- Modify: `ops/runbooks/rollback.md`
- Test: `deploy/hetzner/tests/test_rollout_script.py`

- [ ] **Step 1: Update the deploy runbook**

Replace the deployment steps in `ops/runbooks/deploy.md` with:

```md
# Deploy Runbook

Use this runbook for the canonical Lovora production deployment at `/srv/lovora/lovora/deploy/hetzner`.

1. SSH to the Hetzner host and enter the bundle directory.
2. Load `anythingllm.env` and confirm the required secrets and domain settings are present.
3. Run `bash scripts/preflight.sh`.
4. Run `bash scripts/rollout.sh`.
5. If rollout succeeds, confirm the stack is healthy with `docker compose -f docker-compose.yml ps`.
6. Inspect `${LOVORA_DATA_ROOT:-../../.data/hetzner}/deploy/release-state.env` and confirm `CURRENT_RUNTIME_IMAGE` matches the expected release image.

If `scripts/rollout.sh` exits non-zero after a smoke failure, it will attempt to redeploy the prior recorded runtime image automatically before returning control to the operator.
```

- [ ] **Step 2: Update the rollback runbook**

Replace the release rollback steps in `ops/runbooks/rollback.md` with:

```md
# Rollback Runbook

Use this when a release is bad and you need to separate release rollback from data recovery.

`deploy/hetzner/scripts/backup.sh` does not capture application code or container images. It only backs up `anythingllm.env`, `server/storage`, and `collector` data.
That means a backup restore can recover environment and runtime data, but it cannot roll Lovora back to an older code revision by itself.

1. Check `${LOVORA_DATA_ROOT:-../../.data/hetzner}/deploy/release-state.env` for the current healthy runtime image reference.
2. If the most recent rollout failed, review the `scripts/rollout.sh` output first. It now attempts to redeploy the prior runtime image automatically on smoke failure.
3. If you still need a manual release rollback, redeploy the last known-good code revision from Git and rerun `bash scripts/rollout.sh` from that revision so it builds and records a fresh explicit runtime image.
4. If you also need runtime-data recovery, restore the latest backup with `bash scripts/restore.sh <backup-name-or-latest>`.
5. Re-run `bash scripts/smoke.sh` and verify the live site and API are responsive.

Treat restore as data recovery and rollout as release recovery. They solve different problems and may both be required.
```

- [ ] **Step 3: Re-run the rollout regression plus neighboring infra checks**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_rollout_script -v
python3 -m unittest deploy.hetzner.tests.test_backup_script -v
python3 -m unittest deploy.hetzner.tests.test_restore_script -v
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

Expected: PASS on all four test modules.

- [ ] **Step 4: Commit the docs alignment**

```bash
git add ops/runbooks/deploy.md ops/runbooks/rollback.md deploy/hetzner/tests/test_rollout_script.py
git commit -m "docs: document recoverable hetzner rollouts"
```

## Self-Review

- Spec coverage: The plan covers both root findings directly. `rollout.sh` gains an automatic recovery step on smoke failure, and `docker-compose.yml` stops relying on the single mutable `latest` image reference by moving to explicit runtime images. The runbooks are updated so operators know where the active image reference is recorded.
- Placeholder scan: No TODOs, placeholders, or “similar to above” shortcuts remain.
- Type consistency: The same identifiers are used throughout the plan: `LOVORA_RUNTIME_IMAGE`, `CURRENT_RUNTIME_IMAGE`, `deploy/hetzner/tests/test_rollout_script.py`, and `${LOVORA_DATA_ROOT}/deploy/release-state.env`.

