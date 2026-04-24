from pathlib import Path
import re
import unittest


REPO_ROOT = Path(__file__).resolve().parents[3]
DOCKER_COMPOSE = REPO_ROOT / "deploy" / "hetzner" / "docker-compose.yml"
SUPERVISORD = REPO_ROOT / "deploy" / "hetzner" / "supervisord.conf"
CADDYFILE = REPO_ROOT / "deploy" / "hetzner" / "Caddyfile"


class RuntimeSplitTests(unittest.TestCase):
    def test_docker_compose_splits_server_and_collector_services(self):
        text = DOCKER_COMPOSE.read_text()
        self.assertRegex(text, r"(?m)^services:\n")
        self.assertRegex(text, r"(?m)^  server:\n")
        self.assertRegex(text, r"(?m)^  collector:\n")
        self.assertNotRegex(text, r"(?m)^  app:\n")
        self.assertRegex(
            text,
            re.escape('command: ["cd /app/collector && exec node index.js"]'),
        )
        self.assertNotRegex(text, re.escape("exec yarn start"))

    def test_supervisord_only_runs_server_program(self):
        text = SUPERVISORD.read_text()
        self.assertRegex(text, r"(?m)^\[program:anythingllm\]\n")
        self.assertNotRegex(text, r"(?m)^\[program:collector\]\n")
        self.assertNotRegex(text, re.escape("cd /app/collector"))

    def test_caddy_routes_to_split_server_service(self):
        text = CADDYFILE.read_text()
        self.assertIn("reverse_proxy server:3001", text)
        self.assertNotIn("reverse_proxy app:3001", text)


if __name__ == "__main__":
    unittest.main()
