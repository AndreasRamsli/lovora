import os
import re
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
        self.assertIn(
            "image: ${LOVORA_RUNTIME_IMAGE:-lovora-hetzner-runtime:latest}", text
        )
        self.assertNotIn("image: lovora-hetzner-runtime:latest", text)

    def test_rollout_build_passes_uid_gid_build_args(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            runtime_state = tmp / "docker-runtime-image.txt"
            runtime_state.write_text("")

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"

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
                    runtime_image="${{LOVORA_RUNTIME_IMAGE-}}"

                    if [[ "$*" == *"build "* ]]; then
                      echo "docker:$runtime_image:$*" >> "{log_path}"
                      exit 0
                    fi

                    if [[ "$*" == *" up "* && -n "$runtime_image" ]]; then
                      printf '%s\\n' "$runtime_image" > "{runtime_state}"
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps"* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    if [[ "$*" == *"image ls --format"* ]]; then
                      exit 0
                    fi

                    echo "docker:$runtime_image:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)
            env["UID"] = "1234"
            env["GID"] = "2345"

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertEqual(result.returncode, 0, result.stderr)
            calls = log_path.read_text().splitlines()
            build_call = next(
                call
                for call in calls
                if call.startswith("docker::build ")
            )
            self.assertIn("--build-arg ARG_UID=1234", build_call)
            self.assertIn("--build-arg ARG_GID=2345", build_call)

    def test_rollout_recreates_caddy_after_runtime_deploy(self):
        text = ROLLOUT_SCRIPT.read_text()
        self.assertIn("--force-recreate --no-deps caddy", text)

    def test_rollout_build_defaults_uid_gid_when_not_exported(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            runtime_state = tmp / "docker-runtime-image.txt"
            runtime_state.write_text("")

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"

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
                    runtime_image="${{LOVORA_RUNTIME_IMAGE-}}"

                    if [[ "$*" == *"build "* ]]; then
                      echo "docker:$runtime_image:$*" >> "{log_path}"
                      exit 0
                    fi

                    if [[ "$*" == *" up "* && -n "$runtime_image" ]]; then
                      printf '%s\\n' "$runtime_image" > "{runtime_state}"
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps"* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    if [[ "$*" == *"image ls --format"* ]]; then
                      exit 0
                    fi

                    echo "docker:$runtime_image:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)
            env.pop("UID", None)
            env.pop("GID", None)

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertEqual(result.returncode, 0, result.stderr)
            calls = log_path.read_text().splitlines()
            build_call = next(
                call
                for call in calls
                if call.startswith("docker::build ")
            )
            self.assertIn("--build-arg ARG_UID=1000", build_call)
            self.assertIn("--build-arg ARG_GID=1000", build_call)

    def test_rollout_redeploys_prior_runtime_image_when_candidate_smoke_fails(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            runtime_state = tmp / "docker-runtime-image.txt"
            runtime_state.write_text("lovora-hetzner-runtime:stable-old\n")

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            state_dir = data_root / "deploy"
            state_dir.mkdir(parents=True)
            state_file = state_dir / "release-state.env"

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
                    if [[ "$LOVORA_RUNTIME_IMAGE" == lovora-hetzner-runtime:git-deadbeef-* ]]; then
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
                    runtime_image="${{LOVORA_RUNTIME_IMAGE-}}"
                    current_runtime_image="$(cat "{runtime_state}")"

                    if [[ "$1" == "build" ]]; then
                      echo "docker:$runtime_image:$*" >> "{log_path}"
                      exit 0
                    fi

                    if [[ "$*" == *" up "* && -n "$runtime_image" ]]; then
                      printf '%s\\n' "$runtime_image" > "{runtime_state}"
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps -q server"* ]]; then
                      if [[ -n "$current_runtime_image" ]]; then
                        echo "container-123"
                      fi
                      exit 0
                    fi

                    if [[ "$*" == inspect\\ --format* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps"* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    echo "docker:$runtime_image:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)
            env["UID"] = "1000"
            env["GID"] = "1000"

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            calls = log_path.read_text().splitlines()
            build_call = next(
                call
                for call in calls
                if call.startswith("docker::build ")
            )
            candidate_runtime_image = re.search(
                r"-t (lovora-hetzner-runtime:git-deadbeef-[^ ]+) ",
                build_call,
            ).group(1)
            self.assertEqual(
                build_call,
                "docker::build --build-arg ARG_UID=1000 --build-arg ARG_GID=1000 -f "
                f"{repo_root / 'deploy' / 'hetzner' / 'Dockerfile'} -t "
                f"{candidate_runtime_image} "
                f"{repo_root}",
            )
            self.assertIn(
                "docker:"
                f"{candidate_runtime_image}:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertIn(f"smoke:{candidate_runtime_image}", calls)
            self.assertIn(
                "docker:lovora-hetzner-runtime:stable-old:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertIn("smoke:lovora-hetzner-runtime:stable-old", calls)
            self.assertEqual(
                state_file.read_text(),
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:stable-old\n",
            )

    def test_rollout_rollback_prefers_running_image_over_stale_state(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            runtime_state = tmp / "docker-runtime-image.txt"
            runtime_state.write_text("lovora-hetzner-runtime:live-stable\n")

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            state_dir = data_root / "deploy"
            state_dir.mkdir(parents=True)
            state_file = state_dir / "release-state.env"
            state_file.write_text(
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:stale-state\n"
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
                    if [[ "$LOVORA_RUNTIME_IMAGE" == lovora-hetzner-runtime:git-deadbeef-* ]]; then
                      exit 1
                    fi
                    if [[ "$LOVORA_RUNTIME_IMAGE" == lovora-hetzner-runtime:live-stable ]]; then
                      exit 0
                    fi
                    exit 1
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
                    runtime_image="${{LOVORA_RUNTIME_IMAGE-}}"
                    current_runtime_image="$(cat "{runtime_state}")"

                    if [[ "$1" == "build" ]]; then
                      echo "docker:$runtime_image:$*" >> "{log_path}"
                      exit 0
                    fi

                    if [[ "$*" == *" up "* && -n "$runtime_image" ]]; then
                      printf '%s\\n' "$runtime_image" > "{runtime_state}"
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps -q server"* ]]; then
                      if [[ -n "$current_runtime_image" ]]; then
                        echo "container-123"
                      fi
                      exit 0
                    fi

                    if [[ "$*" == inspect\\ --format* ]]; then
                      echo "$current_runtime_image"
                      exit 0
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps"* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    if [[ "$*" == *"image ls --format"* ]]; then
                      exit 0
                    fi

                    echo "docker:$runtime_image:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)
            env["UID"] = "1000"
            env["GID"] = "1000"

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertIn(
                "rollback to prior runtime image succeeded",
                result.stderr,
            )
            calls = log_path.read_text().splitlines()
            self.assertIn(
                "docker:lovora-hetzner-runtime:live-stable:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertNotIn(
                "docker:lovora-hetzner-runtime:stale-state:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertIn("smoke:lovora-hetzner-runtime:live-stable", calls)
            self.assertEqual(
                state_file.read_text(),
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:live-stable\n",
            )

    def test_rollout_same_commit_retry_keeps_prior_image_recoverable(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            runtime_state = tmp / "docker-runtime-image.txt"
            runtime_state.write_text("lovora-hetzner-runtime:git-deadbeef\n")
            broken_tags = tmp / "broken-tags.txt"
            broken_tags.write_text("")

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            state_dir = data_root / "deploy"
            state_dir.mkdir(parents=True)
            state_file = state_dir / "release-state.env"
            state_file.write_text(
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:git-deadbeef\n"
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
                    if grep -Fxq "$LOVORA_RUNTIME_IMAGE" "{broken_tags}"; then
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
                    runtime_image="${{LOVORA_RUNTIME_IMAGE-}}"
                    current_runtime_image="$(cat "{runtime_state}")"

                    if [[ "$1" == "build" ]]; then
                      build_tag=""
                      prev=""
                      for arg in "$@"; do
                        if [[ "$prev" == "-t" ]]; then
                          build_tag="$arg"
                          break
                        fi
                        prev="$arg"
                      done
                      echo "$build_tag" >> "{broken_tags}"
                      echo "docker:$runtime_image:$*" >> "{log_path}"
                      exit 0
                    fi

                    if [[ "$*" == *" up "* && -n "$runtime_image" ]]; then
                      printf '%s\\n' "$runtime_image" > "{runtime_state}"
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps -q server"* ]]; then
                      if [[ -n "$current_runtime_image" ]]; then
                        echo "container-123"
                      fi
                      exit 0
                    fi

                    if [[ "$*" == inspect\\ --format* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps"* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    echo "docker:$runtime_image:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)
            env["UID"] = "1000"
            env["GID"] = "1000"

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertIn(
                "rollback to prior runtime image succeeded",
                result.stderr,
            )
            calls = log_path.read_text().splitlines()
            build_call = next(
                call
                for call in calls
                if call.startswith("docker::build ")
            )
            candidate_runtime_image = re.search(
                r"-t (lovora-hetzner-runtime:git-deadbeef-[^ ]+) ",
                build_call,
            ).group(1)
            self.assertIn(f"smoke:{candidate_runtime_image}", calls)
            self.assertIn(
                "docker:lovora-hetzner-runtime:git-deadbeef:compose -f "
                f"{hetzner_dir / 'docker-compose.yml'} up -d --no-build",
                calls,
            )
            self.assertIn("smoke:lovora-hetzner-runtime:git-deadbeef", calls)
            self.assertEqual(
                state_file.read_text(),
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:git-deadbeef\n",
            )

    def test_rollout_prunes_older_lovora_runtime_images_after_success(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            fake_bin = tmp / "bin"
            fake_bin.mkdir()
            log_path = tmp / "calls.log"
            runtime_state = tmp / "docker-runtime-image.txt"
            runtime_state.write_text("lovora-hetzner-runtime:stable-current\n")
            image_state = tmp / "docker-images.txt"
            image_state.write_text(
                "\n".join(
                    [
                        "lovora-hetzner-runtime:stable-current",
                        "lovora-hetzner-runtime:stable-older-1",
                        "lovora-hetzner-runtime:stable-older-2",
                        "postgres:16",
                        "lovora-sidecar:latest",
                    ]
                )
                + "\n"
            )

            repo_root = tmp / "repo"
            hetzner_dir = repo_root / "deploy" / "hetzner"
            script_dir = hetzner_dir / "scripts"
            script_dir.mkdir(parents=True)
            data_root = repo_root / ".data" / "hetzner"
            state_dir = data_root / "deploy"
            state_dir.mkdir(parents=True)
            state_file = state_dir / "release-state.env"
            state_file.write_text(
                "CURRENT_RUNTIME_IMAGE=lovora-hetzner-runtime:stable-current\n"
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
                    runtime_image="${{LOVORA_RUNTIME_IMAGE-}}"
                    current_runtime_image="$(cat "{runtime_state}")"

                    if [[ "$1" == "build" ]]; then
                      build_tag=""
                      prev=""
                      for arg in "$@"; do
                        if [[ "$prev" == "-t" ]]; then
                          build_tag="$arg"
                          break
                        fi
                        prev="$arg"
                      done
                      printf '%s\\n' "$build_tag" >> "{image_state}"
                      echo "docker:$runtime_image:$*" >> "{log_path}"
                      exit 0
                    fi

                    if [[ "$*" == *" up "* && -n "$runtime_image" ]]; then
                      printf '%s\\n' "$runtime_image" > "{runtime_state}"
                    fi

                    if [[ "$*" == *"compose -f "* && "$*" == *" ps"* ]]; then
                      cat "{runtime_state}"
                      exit 0
                    fi

                    if [[ "$*" == *"image ls --format"* ]]; then
                      cat "{image_state}"
                      exit 0
                    fi

                    if [[ "$1" == "image" && "$2" == "rm" ]]; then
                      tmp_images="$(mktemp)"
                      shift 2
                      for image in "$@"; do
                        echo "docker:$runtime_image:image rm $image" >> "{log_path}"
                        grep -Fvx "$image" "{image_state}" > "$tmp_images" || true
                        mv "$tmp_images" "{image_state}"
                      done
                      exit 0
                    fi

                    echo "docker:$runtime_image:$*" >> "{log_path}"
                    exit 0
                    """
                ),
            )

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}:{env['PATH']}"
            env["LOVORA_DATA_ROOT"] = str(data_root)
            env["UID"] = "1000"
            env["GID"] = "1000"

            result = subprocess.run(
                ["bash", str(rollout_script)],
                cwd=repo_root,
                env=env,
                capture_output=True,
                text=True,
            )

            self.assertEqual(result.returncode, 0, result.stderr)
            calls = log_path.read_text().splitlines()
            build_call = next(
                call
                for call in calls
                if call.startswith("docker::build ")
            )
            candidate_runtime_image = re.search(
                r"-t (lovora-hetzner-runtime:git-deadbeef-[^ ]+) ",
                build_call,
            ).group(1)
            self.assertEqual(
                state_file.read_text(),
                f"CURRENT_RUNTIME_IMAGE={candidate_runtime_image}\n",
            )
            self.assertIn(
                "docker::image rm lovora-hetzner-runtime:stable-older-1",
                calls,
            )
            self.assertIn(
                "docker::image rm lovora-hetzner-runtime:stable-older-2",
                calls,
            )
            self.assertNotIn(
                "docker::image rm postgres:16",
                calls,
            )
            self.assertNotIn(
                "docker::image rm lovora-sidecar:latest",
                calls,
            )
            self.assertEqual(
                image_state.read_text().splitlines(),
                [
                    "lovora-hetzner-runtime:stable-current",
                    "postgres:16",
                    "lovora-sidecar:latest",
                    candidate_runtime_image,
                ],
            )

    def _write_executable(self, path: Path, content: str) -> None:
        path.write_text(content)
        path.chmod(path.stat().st_mode | stat.S_IEXEC)


if __name__ == "__main__":
    unittest.main()
