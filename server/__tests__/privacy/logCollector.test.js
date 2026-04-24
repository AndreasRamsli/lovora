/* eslint-env jest */
const {
  createLogCollector,
} = require("../../test-support/privacy/logCollector");

describe("privacy log collector", () => {
  afterEach(() => {
    console.log = global.console.log;
    console.warn = global.console.warn;
    console.error = global.console.error;
  });

  test("nested collectors can restore out of order without leaving console wrapped", () => {
    const originalWarn = console.warn;
    const outer = createLogCollector();
    const inner = createLogCollector();

    console.warn("before-restore");

    inner.restore();
    console.warn("after-inner-restore");
    expect(console.warn).not.toBe(originalWarn);

    outer.restore();
    expect(console.warn).toBe(originalWarn);
  });

  test("collector safely captures circular values without throwing", () => {
    const collector = createLogCollector();
    const circular = { name: "loop" };
    circular.self = circular;

    expect(() => console.error("circular-entry", circular)).not.toThrow();
    expect(
      collector.entries.some(
        (entry) =>
          entry.message.includes("circular-entry") &&
          entry.message.includes("[Circular]")
      )
    ).toBe(true);

    collector.restore();
  });
});
