/* eslint-env jest */
jest.mock("../../../models/systemSettings", () => ({
  SystemSettings: {
    isMultiUserMode: jest.fn(),
  },
}));

jest.mock("../../../utils/auth/requestUserFromRequest", () => ({
  resolveRequestUser: jest.fn(),
}));

const previousNodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = "development";

const { SystemSettings } = require("../../../models/systemSettings");
const { resolveRequestUser } = require("../../../utils/auth/requestUserFromRequest");
const { validatedRequest } = require("../../../utils/middleware/validatedRequest");

describe("validatedRequest (better-auth multi-user)", () => {
  afterAll(() => {
    process.env.NODE_ENV = previousNodeEnv;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("accepts cookie-authenticated multi-user request and sets response.locals.user", async () => {
    SystemSettings.isMultiUserMode.mockResolvedValue(true);
    resolveRequestUser.mockResolvedValue({
      id: 7,
      username: "cookie@example.com",
      suspended: 0,
    });

    const request = { headers: {} };
    const response = {
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await validatedRequest(request, response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(response.locals.user).toMatchObject({ id: 7 });
  });

  test("rejects multi-user request when no authenticated user can be resolved", async () => {
    SystemSettings.isMultiUserMode.mockResolvedValue(true);
    resolveRequestUser.mockResolvedValue(null);

    const request = { headers: {} };
    const response = {
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await validatedRequest(request, response, next);
    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(401);
  });
});
