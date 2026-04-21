/* eslint-env jest */

jest.mock("../../../models/telemetry", () => ({
  Telemetry: {
    flush: jest.fn(),
  },
}));

jest.mock("../../../utils/BackgroundWorkers", () => ({
  BackgroundService: jest.fn(() => ({
    boot: jest.fn(),
  })),
}));

jest.mock("../../../utils/EncryptionManager", () => ({
  EncryptionManager: jest.fn(),
}));

jest.mock("../../../utils/comKey", () => ({
  CommunicationKey: jest.fn(),
}));

jest.mock("../../../utils/telemetry", () => jest.fn().mockResolvedValue());

jest.mock("../../../utils/boot/eagerLoadContextWindows", () =>
  jest.fn().mockResolvedValue()
);

jest.mock("../../../utils/boot/markOnboarded", () =>
  jest.fn().mockResolvedValue(true)
);

jest.mock("../../../utils/PushNotifications", () => ({
  PushNotifications: {
    setupPushNotificationService: jest.fn().mockResolvedValue(),
  },
}));

jest.mock("../../../utils/moderation/schemaReadiness", () => ({
  logStartupReadiness: jest.fn().mockResolvedValue(),
}));

jest.mock("../../../utils/boot/ensureProductionAuthState", () => ({
  ensureProductionAuthState: jest.fn().mockResolvedValue(null),
}));

const markOnboarded = require("../../../utils/boot/markOnboarded");
const {
  ensureProductionAuthState,
} = require("../../../utils/boot/ensureProductionAuthState");
const { bootHTTP } = require("../../../utils/boot");

describe("bootHTTP", () => {
  let consoleLogSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("marks upgraded installs onboarded before checking production auth state", async () => {
    const on = jest.fn();
    const app = {
      listen: jest.fn((_port, callback) => {
        app.bootCallback = callback;
        return { on };
      }),
    };

    bootHTTP(app, 3001);
    await app.bootCallback();

    expect(markOnboarded).toHaveBeenCalledTimes(1);
    expect(ensureProductionAuthState).toHaveBeenCalledTimes(1);
    expect(markOnboarded.mock.invocationCallOrder[0]).toBeLessThan(
      ensureProductionAuthState.mock.invocationCallOrder[0]
    );
  });
});
