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
    def test_backup_quiesces_writer_services_before_archiving_and_restarts_them(
        self,
    ):
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
                      case "$6" in
                        server|collector)
                          echo "$6-container"
                          ;;
                      esac
                      exit 0
                    fi
                    if [[ "$1" == "inspect" ]]; then
                      echo "true"
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
            env["LOVORA_DATA_ROOT"] = str(data_root)

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
