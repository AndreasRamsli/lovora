from pathlib import Path
import unittest


REPO_ROOT = Path(__file__).resolve().parents[3]
HETZNER_README = REPO_ROOT / "deploy" / "hetzner" / "README.md"
RAMSLI_README = REPO_ROOT / "ramsli-custom" / "README.md"


class CanonicalBundleDocsTests(unittest.TestCase):
    def test_hetzner_readme_states_it_is_the_canonical_production_bundle(self):
        text = HETZNER_README.read_text()
        self.assertIn("canonical production deployment", text)
        self.assertIn("/srv/lovora/lovora/deploy/hetzner", text)

    def test_ramsli_readme_marks_it_as_legacy_only(self):
        text = RAMSLI_README.read_text()
        self.assertIn("legacy deployment bundle", text)
        self.assertIn("Do not use for new production deployments.", text)


if __name__ == "__main__":
    unittest.main()
