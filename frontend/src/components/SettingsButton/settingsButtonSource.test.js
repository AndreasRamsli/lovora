import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const settingsButtonRoot = path.dirname(new URL(import.meta.url).pathname);
const frontendRoot = path.join(settingsButtonRoot, "..", "..");

function readSource(...segments) {
  return fs.readFileSync(path.join(frontendRoot, ...segments), "utf8");
}

describe("top-right settings preferences", () => {
  test("UserButton owns settings preferences without rendering an extra settings button", () => {
    const source = readSource(
      "components",
      "UserMenu",
      "UserButton",
      "index.jsx"
    );

    expect(source).toContain("useThemeContext");
    expect(source).toContain("useLanguageOptions");
    expect(source).toContain("availableThemes");
    expect(source).toContain("supportedLanguages");
    expect(source).not.toContain(
      'import SettingsButton from "@/components/SettingsButton"'
    );
    expect(source).not.toContain("<SettingsButton />");
  });

  test("AccountModal no longer contains theme or language selectors", () => {
    const source = readSource(
      "components",
      "UserMenu",
      "AccountModal",
      "index.jsx"
    );

    expect(source).not.toContain("<ThemePreference />");
    expect(source).not.toContain("<LanguagePreference />");
    expect(source).not.toContain("function ThemePreference");
    expect(source).not.toContain("function LanguagePreference");
  });
});
