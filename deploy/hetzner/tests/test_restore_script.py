import os
import stat
import subprocess
import tarfile
import tempfile
import textwrap
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
RESTORE_SCRIPT = REPO_ROOT / "deploy" / "hetzner" / "scripts" / "restore.sh"


class RestoreScriptTests(unittest.TestCase):
    def test_restore_rolls_back_prior_live_state_when_smoke_check_fails(self):
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
            live_env_file = hetzner_dir / "anythingllm.env"
            compose_file = hetzner_dir / "docker-compose.yml"
            backup_root = tmp / "backups"
            backup_dir = backup_root / "incident-restore"

            restore_script = script_dir / "restore.sh"
            restore_script.write_text(RESTORE_SCRIPT.read_text())
            restore_script.chmod(0o755)

            compose_file.write_text("services:\n")
            live_env_file.write_text("DOMAIN=live.example.com\n")
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector").mkdir(parents=True)
            (data_root / "server" / "storage" / "state.txt").write_text("live-state\n")
            (data_root / "collector" / "state.txt").write_text("live-collector\n")

            backup_dir.mkdir(parents=True)
            (backup_dir / "anythingllm.env").write_text("DOMAIN=backup.example.com\n")
            self._write_backup_archive(
                backup_dir / "server-storage.tar.gz",
                {
                    "server/storage/state.txt": "backup-state\n",
                },
            )
            self._write_backup_archive(
                backup_dir / "collector.tar.gz",
                {
                    "collector/state.txt": "backup-collector\n",
                },
            )

            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$*" >> "{log_path}"
                    if grep -q 'backup.example.com' "{live_env_file}"; then
                      exit 1
                    fi
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(backup_root)
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(restore_script), "incident-restore"],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(live_env_file.read_text(), "DOMAIN=live.example.com\n")
            self.assertEqual(
                (data_root / "server" / "storage" / "state.txt").read_text(),
                "live-state\n",
            )
            self.assertEqual(
                (data_root / "collector" / "state.txt").read_text(),
                "live-collector\n",
            )

            calls = log_path.read_text().splitlines()
            self.assertEqual(calls.count(f"docker:compose -f {compose_file} up -d --build"), 2)
            self.assertIn("smoke:", calls[-1])

    def test_restore_rolls_back_prior_live_state_when_cutover_env_install_fails(self):
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
            live_env_file = hetzner_dir / "anythingllm.env"
            compose_file = hetzner_dir / "docker-compose.yml"
            backup_root = tmp / "backups"
            backup_dir = backup_root / "incident-restore"
            fail_marker = tmp / "install-failed.marker"

            restore_script = script_dir / "restore.sh"
            restore_script.write_text(RESTORE_SCRIPT.read_text())
            restore_script.chmod(0o755)

            compose_file.write_text("services:\n")
            live_env_file.write_text("DOMAIN=live.example.com\n")
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector").mkdir(parents=True)
            (data_root / "server" / "storage" / "state.txt").write_text("live-state\n")
            (data_root / "collector" / "state.txt").write_text("live-collector\n")

            backup_dir.mkdir(parents=True)
            (backup_dir / "anythingllm.env").write_text("DOMAIN=backup.example.com\n")
            self._write_backup_archive(
                backup_dir / "server-storage.tar.gz",
                {
                    "server/storage/state.txt": "backup-state\n",
                },
            )
            self._write_backup_archive(
                backup_dir / "collector.tar.gz",
                {
                    "collector/state.txt": "backup-collector\n",
                },
            )

            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )
            self._write_executable(
                fake_bin / "install",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "install:$*" >> "{log_path}"
                    src="${{@: -2:1}}"
                    dest="${{@: -1}}"
                    if [[ "$dest" == "{live_env_file}" && "$src" != "{live_env_file}" && ! -f "{fail_marker}" ]]; then
                      touch "{fail_marker}"
                      exit 1
                    fi
                    /usr/bin/install "$@"
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(backup_root)
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(restore_script), "incident-restore"],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(live_env_file.read_text(), "DOMAIN=live.example.com\n")
            self.assertEqual(
                (data_root / "server" / "storage" / "state.txt").read_text(),
                "live-state\n",
            )
            self.assertEqual(
                (data_root / "collector" / "state.txt").read_text(),
                "live-collector\n",
            )

            calls = log_path.read_text().splitlines()
            self.assertEqual(calls.count(f"docker:compose -f {compose_file} up -d --build"), 1)
            self.assertIn(
                f"install:-m 600 {live_env_file} ",
                "\n".join(calls),
            )

    def test_restore_keeps_live_env_when_preserving_prior_env_fails(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            fail_marker = tmp / "install-failed.marker"

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            live_env_file = hetzner_dir / "anythingllm.env"
            compose_file = hetzner_dir / "docker-compose.yml"
            backup_root = tmp / "backups"
            backup_dir = backup_root / "incident-restore"

            restore_script = script_dir / "restore.sh"
            restore_script.write_text(RESTORE_SCRIPT.read_text())
            restore_script.chmod(0o755)

            compose_file.write_text("services:\n")
            live_env_file.write_text("DOMAIN=live.example.com\n")
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector").mkdir(parents=True)
            (data_root / "server" / "storage" / "state.txt").write_text("live-state\n")
            (data_root / "collector" / "state.txt").write_text("live-collector\n")

            backup_dir.mkdir(parents=True)
            (backup_dir / "anythingllm.env").write_text("DOMAIN=backup.example.com\n")
            self._write_backup_archive(
                backup_dir / "server-storage.tar.gz",
                {
                    "server/storage/state.txt": "backup-state\n",
                },
            )
            self._write_backup_archive(
                backup_dir / "collector.tar.gz",
                {
                    "collector/state.txt": "backup-collector\n",
                },
            )

            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )
            self._write_executable(
                fake_bin / "install",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "install:$*" >> "{log_path}"
                    src="${{@: -2:1}}"
                    dest="${{@: -1}}"
                    if [[ "$src" == "{live_env_file}" && "$dest" == */previous.env && ! -f "{fail_marker}" ]]; then
                      touch "{fail_marker}"
                      exit 1
                    fi
                    /usr/bin/install "$@"
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(backup_root)
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(restore_script), "incident-restore"],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(live_env_file.read_text(), "DOMAIN=live.example.com\n")
            self.assertEqual(
                (data_root / "server" / "storage" / "state.txt").read_text(),
                "live-state\n",
            )
            self.assertEqual(
                (data_root / "collector" / "state.txt").read_text(),
                "live-collector\n",
            )

            calls = log_path.read_text().splitlines()
            self.assertEqual(calls.count(f"docker:compose -f {compose_file} up -d --build"), 1)
            self.assertTrue(any(line.startswith("smoke:") for line in calls))

    def test_restore_preserves_snapshot_when_rollback_env_restore_fails(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            fail_marker = tmp / "rollback-env-failed.marker"

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            live_env_file = hetzner_dir / "anythingllm.env"
            compose_file = hetzner_dir / "docker-compose.yml"
            backup_root = tmp / "backups"
            backup_dir = backup_root / "incident-restore"

            restore_script = script_dir / "restore.sh"
            restore_script.write_text(RESTORE_SCRIPT.read_text())
            restore_script.chmod(0o755)

            compose_file.write_text("services:\n")
            live_env_file.write_text("DOMAIN=live.example.com\n")
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector").mkdir(parents=True)
            (data_root / "server" / "storage" / "state.txt").write_text("live-state\n")
            (data_root / "collector" / "state.txt").write_text("live-collector\n")

            backup_dir.mkdir(parents=True)
            (backup_dir / "anythingllm.env").write_text("DOMAIN=backup.example.com\n")
            self._write_backup_archive(
                backup_dir / "server-storage.tar.gz",
                {
                    "server/storage/state.txt": "backup-state\n",
                },
            )
            self._write_backup_archive(
                backup_dir / "collector.tar.gz",
                {
                    "collector/state.txt": "backup-collector\n",
                },
            )

            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )
            self._write_executable(
                fake_bin / "install",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "install:$*" >> "{log_path}"
                    src="${{@: -2:1}}"
                    dest="${{@: -1}}"
                    if [[ "$src" == */previous.env && "$dest" == "{live_env_file}" && ! -f "{fail_marker}" ]]; then
                      touch "{fail_marker}"
                      exit 1
                    fi
                    /usr/bin/install "$@"
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$*" >> "{log_path}"
                    if grep -q 'backup.example.com' "{live_env_file}"; then
                      exit 1
                    fi
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(backup_root)
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(restore_script), "incident-restore"],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            stage_root = self._find_restore_stage_root(data_root)
            self.assertIsNotNone(stage_root)
            self.assertTrue((stage_root / "previous.env").exists())

    def test_restore_preserves_snapshot_when_rollback_data_move_fails(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            fail_marker = tmp / "rollback-data-failed.marker"

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            live_env_file = hetzner_dir / "anythingllm.env"
            compose_file = hetzner_dir / "docker-compose.yml"
            backup_root = tmp / "backups"
            backup_dir = backup_root / "incident-restore"

            restore_script = script_dir / "restore.sh"
            restore_script.write_text(RESTORE_SCRIPT.read_text())
            restore_script.chmod(0o755)

            compose_file.write_text("services:\n")
            live_env_file.write_text("DOMAIN=live.example.com\n")
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector").mkdir(parents=True)
            (data_root / "server" / "storage" / "state.txt").write_text("live-state\n")
            (data_root / "collector" / "state.txt").write_text("live-collector\n")

            backup_dir.mkdir(parents=True)
            (backup_dir / "anythingllm.env").write_text("DOMAIN=backup.example.com\n")
            self._write_backup_archive(
                backup_dir / "server-storage.tar.gz",
                {
                    "server/storage/state.txt": "backup-state\n",
                },
            )
            self._write_backup_archive(
                backup_dir / "collector.tar.gz",
                {
                    "collector/state.txt": "backup-collector\n",
                },
            )

            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )
            self._write_executable(
                fake_bin / "mv",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "mv:$*" >> "{log_path}"
                    src="${{@: -2:1}}"
                    dest="${{@: -1}}"
                    if [[ "$src" == */previous-data && "$dest" == "{data_root}" && ! -f "{fail_marker}" ]]; then
                      touch "{fail_marker}"
                      exit 1
                    fi
                    /bin/mv "$@"
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$*" >> "{log_path}"
                    if grep -q 'backup.example.com' "{live_env_file}"; then
                      exit 1
                    fi
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(backup_root)
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(restore_script), "incident-restore"],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            stage_root = self._find_restore_stage_root(data_root)
            self.assertIsNotNone(stage_root)
            self.assertTrue((stage_root / "previous-data").exists())

    def test_restore_keeps_live_state_when_preserving_prior_data_fails_before_cutover(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            fail_marker = tmp / "preserve-data-failed.marker"

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            live_env_file = hetzner_dir / "anythingllm.env"
            compose_file = hetzner_dir / "docker-compose.yml"
            backup_root = tmp / "backups"
            backup_dir = backup_root / "incident-restore"

            restore_script = script_dir / "restore.sh"
            restore_script.write_text(RESTORE_SCRIPT.read_text())
            restore_script.chmod(0o755)

            compose_file.write_text("services:\n")
            live_env_file.write_text("DOMAIN=live.example.com\n")
            (data_root / "server" / "storage").mkdir(parents=True)
            (data_root / "collector").mkdir(parents=True)
            (data_root / "server" / "storage" / "state.txt").write_text("live-state\n")
            (data_root / "collector" / "state.txt").write_text("live-collector\n")

            backup_dir.mkdir(parents=True)
            (backup_dir / "anythingllm.env").write_text("DOMAIN=backup.example.com\n")
            self._write_backup_archive(
                backup_dir / "server-storage.tar.gz",
                {
                    "server/storage/state.txt": "backup-state\n",
                },
            )
            self._write_backup_archive(
                backup_dir / "collector.tar.gz",
                {
                    "collector/state.txt": "backup-collector\n",
                },
            )

            self._write_executable(
                fake_bin / "docker",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "docker:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )
            self._write_executable(
                fake_bin / "mv",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "mv:$*" >> "{log_path}"
                    src="${{@: -2:1}}"
                    dest="${{@: -1}}"
                    if [[ "$src" == "{data_root}" && "$dest" == */previous-data && ! -f "{fail_marker}" ]]; then
                      touch "{fail_marker}"
                      exit 1
                    fi
                    /bin/mv "$@"
                    """
                ),
            )
            self._write_executable(
                script_dir / "smoke.sh",
                textwrap.dedent(
                    f"""\
                    #!/usr/bin/env bash
                    set -euo pipefail
                    echo "smoke:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_BACKUP_ROOT"] = str(backup_root)
            env["LOVORA_DATA_ROOT"] = str(data_root)

            result = subprocess.run(
                ["bash", str(restore_script), "incident-restore"],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(live_env_file.read_text(), "DOMAIN=live.example.com\n")
            self.assertEqual(
                (data_root / "server" / "storage" / "state.txt").read_text(),
                "live-state\n",
            )
            self.assertEqual(
                (data_root / "collector" / "state.txt").read_text(),
                "live-collector\n",
            )
            self.assertIsNone(self._find_restore_stage_root(data_root))
            calls = log_path.read_text().splitlines()
            self.assertEqual(calls.count(f"docker:compose -f {compose_file} up -d --build"), 1)
            self.assertTrue(any(line.startswith("smoke:") for line in calls))

    def _write_backup_archive(self, target: Path, files: dict[str, str]) -> None:
        with tarfile.open(target, "w:gz") as archive:
            for name, content in files.items():
                source = target.parent / name
                source.parent.mkdir(parents=True, exist_ok=True)
                source.write_text(content)
                archive.add(source, arcname=name)

    def _write_executable(self, path: Path, content: str) -> None:
        path.write_text(content)
        path.chmod(path.stat().st_mode | stat.S_IEXEC)

    def _find_restore_stage_root(self, data_root: Path) -> Path | None:
        candidates = sorted(data_root.parent.glob(".restore.*"))
        if not candidates:
            return None
        return candidates[0]


if __name__ == "__main__":
    unittest.main()
