/* global describe, test, expect */
const {
  resolveMode,
  shouldLoadDevelopmentEnv,
} = require("../../scripts/run-with-migrations");

describe("run-with-migrations mode resolution", () => {
  test("resolves explicit modes correctly", () => {
    expect(resolveMode("dev")).toBe("dev");
    expect(resolveMode("migrate-only")).toBe("migrate-only");
    expect(resolveMode("migrate-only-dev")).toBe("migrate-only-dev");
    expect(resolveMode("start")).toBe("start");
    expect(resolveMode("unexpected")).toBe("start");
    expect(resolveMode(undefined)).toBe("start");
  });

  test("loads development env only for dev-specific modes", () => {
    expect(shouldLoadDevelopmentEnv("dev")).toBe(true);
    expect(shouldLoadDevelopmentEnv("migrate-only-dev")).toBe(true);
    expect(shouldLoadDevelopmentEnv("migrate-only")).toBe(false);
    expect(shouldLoadDevelopmentEnv("start")).toBe(false);
  });
});
