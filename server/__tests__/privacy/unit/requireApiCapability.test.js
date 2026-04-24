/* eslint-env jest */

const {
  requireApiCapability,
} = require("../../../utils/middleware/requireApiCapability");

function createResponse(routePolicy, principal, apiKey = { id: 1 }) {
  return {
    locals: { routePolicy, principal, apiKey },
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

describe("requireApiCapability", () => {
  test("allows matching management principals", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        principalAccess: {
          management: ["management:metadata:read"],
        },
      },
      {
        kind: "management",
        scopes: ["management:metadata:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(response.status).not.toHaveBeenCalled();
  });

  test("denies workspace-service keys on management routes", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        principalAccess: {
          management: ["management:metadata:read"],
        },
      },
      {
        kind: "workspace_service",
        scopes: ["workspace:api_sessions:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      error: "API key cannot access this route.",
    });
  });

  test("returns the credential-issuance denial message for blocked api key routes", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        responsePolicy: "deny_credential_issuance",
        principalAccess: {},
      },
      {
        kind: "management",
        scopes: ["management:users:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      error: "API keys cannot issue user auth tokens.",
    });
  });

  test("denies principals missing a required capability", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      {
        kind: "workspace_service",
        scopes: ["workspace:api_sessions:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(403);
  });
});
