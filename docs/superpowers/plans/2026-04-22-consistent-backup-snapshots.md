# Consistent Backup Snapshots Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Hetzner backups produce a consistent restorable snapshot by quiescing the writer services before archiving SQLite-backed runtime data, then restarting only the services that were intentionally paused.

**Architecture:** The current backup flow tars `server/storage` and collector data while the application may still be writing to SQLite and adjacent runtime files. The fix is to make `backup.sh` detect whether `server` and `collector` are running, stop only those writer services before copying runtime data, always restart the same services on exit, and lock the behavior in with an executable regression test that validates the stop-backup-start order.

**Tech Stack:** Bash, Docker Compose, Python `unittest`, temporary test fixtures, mocked shell commands

---

## File Structure

- Modify: `deploy/hetzner/scripts/backup.sh`
  - Owns the production backup workflow for env and runtime data.
- Create: `deploy/hetzner/tests/test_backup_script.py`
  - Owns regression coverage for quiesced backup behavior and restart semantics.
- Inspect: `server/prisma/schema.prisma`
  - Confirms Lovora’s production relational state is still SQLite-backed under `server/storage`.

Keep this fix narrow. Do not redesign restore, do not migrate databases, and do not add a warning-only safeguard. The backup script itself must produce a consistent snapshot by changing runtime behavior at the source.

### Task 1: Prove The Backup Script Currently Archives Live State

**Files:**
- Create: `deploy/hetzner/tests/test_backup_script.py`
- Inspect: `deploy/hetzner/scripts/backup.sh`
- Inspect: `server/prisma/schema.prisma:15-18`

- [ ] **Step 1: Write the failing regression test**

Create `deploy/hetzner/tests/test_backup_script.py` with an executable integration-style test that runs `backup.sh` against fake commands and asserts service quiescing happens before archiving:

```python
import os
import stat
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
BACKUP_SCRIPT = REPO_ROOT / "deploy" / "hetzner" / "scripts" / "backup.sh"


class BackupScriptTests(unittest.TestCase):
    def test_backup_quiesces_writer_services_before_archiving_and_restarts_them(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            state_dir = tmp / "state"
            state_dir.mkdir()

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector" / "hotdir").mkdir(parents=True)
            (data_root / "collector" / "outputs").mkdir(parents=True)
            env_file = hetzner_dir / "anythingllm.env"
            env_file.write_text("DOMAIN=example.com\n")

            backup_script = script_dir / "backup.sh"
            backup_script.write_text(BACKUP_SCRIPT.read_text())
            backup_script.chmod(0o755)

            def write_executable(name: str, content: str) -> None:
                path = fake_bin / name
                path.write_text(content)
                path.chmod(path.stat().st_mode | stat.S_IEXEC)

            write_executable(
                "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    if [[ "$1" == "compose" && "$4" == "ps" && "$5" == "-q" ]]; then
                      service="$6"
                      if [[ "$service" == "server" || "$service" == "collector" ]]; then
                        echo "${{service}}-container"
                      fi
                      exit 0
                    fi
                    if [[ "$1" == "inspect" ]]; then
                      echo "running"
                      exit 0
                    fi
                    exit 0
                    """
                ),
            )
            write_executable(
                "tar",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "tar:$*" >> "{log_path}"
                    touch "$2"
                    """
                ),
            )
            write_executable(
                "cp",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "cp:$*" >> "{log_path}"
                    /bin/cp "$@"
                    """
                ),
            )
            write_executable(
                "install",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "install:$*" >> "{log_path}"
                    /usr/bin/install "$@"
                    """
                ),
            )
            write_executable(
                "ln",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "ln:$*" >> "{log_path}"
                    /bin/ln "$@"
                    """
                ),
            )
            write_executable(
                "date",
                textwrap.dedent(
                    """\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "20260422T120000Z"
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(tmp / "backups")

            subprocess.run(
                ["bash", str(backup_script)],
                cwd=repo_root,
                env=env,
                check=True,
                capture_output=True,
                text=True,
            )

            calls = log_path.read_text().splitlines()
            stop_index = calls.index(
                f"docker:compose -f {hetzner_dir / 'docker-compose.yml'} stop server collector"
            )
            tar_index = next(i for i, line in enumerate(calls) if line.startswith("tar:"))
            start_index = calls.index(
                f"docker:compose -f {hetzner_dir / 'docker-compose.yml'} start server collector"
            )

            self.assertLess(stop_index, tar_index)
            self.assertLess(tar_index, start_index)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_backup_script -v
```

Expected: FAIL because the current `backup.sh` does not call `docker compose ... stop server collector` before `tar`, and it does not restart those services afterward.

- [ ] **Step 3: Confirm why this matters in the current architecture**

Inspect `server/prisma/schema.prisma` and confirm:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:../storage/anythingllm.db"
}
```

Root-cause note: `backup.sh` archives `server/storage` directly, and that directory contains the live SQLite database plus adjacent runtime state. Archiving it while `server` or `collector` are writing risks a backup that is internally inconsistent even if the tarball is syntactically valid.

- [ ] **Step 4: Commit the failing test**

```bash
git add deploy/hetzner/tests/test_backup_script.py
git commit -m "test: cover quiesced hetzner backups"
```

### Task 2: Quiesce Writer Services During Backup

**Files:**
- Modify: `deploy/hetzner/scripts/backup.sh`
- Test: `deploy/hetzner/tests/test_backup_script.py`

- [ ] **Step 1: Implement service-state detection and restart-safe cleanup**

Update `deploy/hetzner/scripts/backup.sh` so it:
- requires `docker`
- computes `compose_file`
- detects whether `server` and `collector` are currently running
- stops only the running writer services before `cp`/`tar`
- restarts only those same services on exit

Use this structure:

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

service_is_running() {
  local compose_file="$1"
  local service_name="$2"
  local container_id container_status

  if ! container_id="$(docker compose -f "$compose_file" ps -q "$service_name" 2>/dev/null)"; then
    return 1
  fi

  if [[ -z "$container_id" ]]; then
    return 1
  fi

  if ! container_status="$(docker inspect --format '{{.State.Status}}' "$container_id" 2>/dev/null)"; then
    return 1
  fi

  [[ "$container_status" == "running" ]]
}

restart_services() {
  local compose_file="$1"
  shift
  local services=("$@")

  if (( ${#services[@]} == 0 )); then
    return 0
  fi

  docker compose -f "$compose_file" start "${services[@]}"
}

main() {
  local script_dir hetzner_dir repo_root env_file data_root backup_root timestamp backup_dir compose_file
  local -a paused_services=()

  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  hetzner_dir="$(cd "$script_dir/.." && pwd)"
  repo_root="$(cd "$hetzner_dir/../.." && pwd)"
  env_file="$hetzner_dir/anythingllm.env"
  compose_file="$hetzner_dir/docker-compose.yml"
  data_root="${LOVORA_DATA_ROOT:-$repo_root/.data/hetzner}"
  backup_root="${LOVORA_BACKUP_ROOT:-/srv/lovora/backups}"
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  backup_dir="$backup_root/lovora-backup-$timestamp"

  require_command docker
  require_command tar

  trap 'restart_services "$compose_file" "${paused_services[@]}"' EXIT

  if service_is_running "$compose_file" "server"; then
    paused_services+=("server")
  fi

  if service_is_running "$compose_file" "collector"; then
    paused_services+=("collector")
  fi

  if (( ${#paused_services[@]} > 0 )); then
    docker compose -f "$compose_file" stop "${paused_services[@]}"
  fi

  # existing validation and copy/archive steps remain here
}

main "$@"
```

Keep the existing env/data validation and tar commands intact after the quiesce step.

- [ ] **Step 2: Run the focused regression test**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_backup_script -v
```

Expected:

```text
test_backup_quiesces_writer_services_before_archiving_and_restarts_them ... ok
```

- [ ] **Step 3: Re-run the existing runtime split regression**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

Expected: PASS. The backup fix must not disturb the runtime split configuration.

- [ ] **Step 4: Commit the implementation**

```bash
git add deploy/hetzner/scripts/backup.sh deploy/hetzner/tests/test_backup_script.py
git commit -m "fix: quiesce writer services during backups"
```

### Task 3: Verify Failure Safety And Scope

**Files:**
- Inspect: `deploy/hetzner/scripts/backup.sh`
- Test: `deploy/hetzner/tests/test_backup_script.py`

- [ ] **Step 1: Verify restart behavior is exit-safe**

Confirm the final script uses an `EXIT` trap so services restart whether backup succeeds or fails after they have been paused:

```bash
trap 'restart_services "$compose_file" "${paused_services[@]}"' EXIT
```

That behavior is required. A failed backup must not silently leave `server` and `collector` stopped.

- [ ] **Step 2: Verify only previously running services are restarted**

Confirm the script does **not** blindly call:

```bash
docker compose -f "$compose_file" start server collector
```

unless those services were actually running before backup. The script should restart only what it paused.

- [ ] **Step 3: Run the full targeted verification**

Run:

```bash
python3 -m unittest deploy.hetzner.tests.test_backup_script -v
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

Expected: PASS on both test modules.

- [ ] **Step 4: Record the verification commands in the change summary**

Use this exact verification block:

```text
Verified with:
- python3 -m unittest deploy.hetzner.tests.test_backup_script -v
- python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
```

## Self-Review

- Spec coverage: This plan covers the root cause in the live backup path, adds a regression test that proves stop/archive/start ordering, and keeps the fix scoped to the backup workflow.
- Placeholder scan: No placeholders, TODOs, or “implement later” language remain.
- Type consistency: File paths, command strings, and service names are consistent across tasks.

