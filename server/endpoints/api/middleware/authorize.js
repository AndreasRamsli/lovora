const { Workspace } = require("../../../models/workspace");
const { WorkspaceThread } = require("../../../models/workspaceThread");
const { reqBody } = require("../../../utils/http");
const {
  assertWorkspaceServiceAccess,
  assertWorkspaceServiceThreadAccess,
} = require("../../../utils/auth/apiContentAuthorization");

function respondAuthorizationFailure(response, error) {
  const status = Number.isInteger(error?.status) ? error.status : 403;
  if (status === 404) {
    response.sendStatus(404).end();
    return;
  }

  response.status(status).json({
    error: error?.message || "API key cannot access this route.",
  });
}

async function loadTargetWorkspace(request, response, next) {
  try {
    const workspace = await Workspace.get({ slug: request.params.slug });
    if (!workspace) {
      response.sendStatus(404).end();
      return;
    }

    response.locals.targetWorkspace = workspace;
    next();
  } catch (error) {
    next(error);
  }
}

async function loadTargetWorkspaceFromModel(request, response, next) {
  try {
    const { model } = reqBody(request);
    const workspaceSlug = String(model || "");
    if (!workspaceSlug) {
      response.sendStatus(401).end();
      return;
    }

    const workspace = await Workspace.get({ slug: workspaceSlug });
    if (!workspace) {
      response.sendStatus(401).end();
      return;
    }

    response.locals.targetWorkspace = workspace;
    next();
  } catch (error) {
    next(error);
  }
}

async function loadTargetThread(request, response, next) {
  try {
    const workspace = response.locals.targetWorkspace;
    if (!workspace?.id) {
      response.sendStatus(404).end();
      return;
    }

    const thread = await WorkspaceThread.get({
      slug: request.params.threadSlug,
      workspace_id: workspace.id,
    });

    if (!thread) {
      response.sendStatus(404).end();
      return;
    }

    response.locals.targetThread = thread;
    next();
  } catch (error) {
    next(error);
  }
}

function requireWorkspaceServiceAccess(capability) {
  return function workspaceServiceAccessMiddleware(_request, response, next) {
    try {
      assertWorkspaceServiceAccess(
        response.locals.principal,
        response.locals.targetWorkspace,
        capability
      );
      next();
    } catch (error) {
      respondAuthorizationFailure(response, error);
    }
  };
}

function requireWorkspaceServiceThreadAccess(capability) {
  return function workspaceServiceThreadAccessMiddleware(
    _request,
    response,
    next
  ) {
    try {
      assertWorkspaceServiceThreadAccess(
        response.locals.principal,
        response.locals.targetWorkspace,
        response.locals.targetThread,
        capability
      );
      next();
    } catch (error) {
      respondAuthorizationFailure(response, error);
    }
  };
}

module.exports = {
  respondAuthorizationFailure,
  loadTargetWorkspace,
  loadTargetWorkspaceFromModel,
  loadTargetThread,
  requireWorkspaceServiceAccess,
  requireWorkspaceServiceThreadAccess,
};
