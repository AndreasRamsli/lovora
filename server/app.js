process.env.NODE_ENV === "development"
  ? require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
  : require("dotenv").config();

require("./utils/logger")();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { reqBody } = require("./utils/http");
const { systemEndpoints } = require("./endpoints/system");
const { workspaceEndpoints } = require("./endpoints/workspaces");
const { chatEndpoints } = require("./endpoints/chat");
const { embeddedEndpoints } = require("./endpoints/embed");
const { embedManagementEndpoints } = require("./endpoints/embedManagement");
const { getVectorDbClass } = require("./utils/helpers");
const { adminEndpoints } = require("./endpoints/admin");
const { inviteEndpoints } = require("./endpoints/invite");
const { utilEndpoints } = require("./endpoints/utils");
const { developerEndpoints } = require("./endpoints/api");
const { extensionEndpoints } = require("./endpoints/extensions");
const { workspaceThreadEndpoints } = require("./endpoints/workspaceThreads");
const { documentEndpoints } = require("./endpoints/document");
const { agentWebsocket } = require("./endpoints/agentWebsocket");
const { experimentalEndpoints } = require("./endpoints/experimental");
const { browserExtensionEndpoints } = require("./endpoints/browserExtension");
const { communityHubEndpoints } = require("./endpoints/communityHub");
const { agentFlowEndpoints } = require("./endpoints/agentFlows");
const { mcpServersEndpoints } = require("./endpoints/mcpServers");
const { mobileEndpoints } = require("./endpoints/mobile");
const { webPushEndpoints } = require("./endpoints/webPush");
const { billingEndpoints } = require("./endpoints/billing");
const { betterAuthBridgeEndpoints } = require("./endpoints/betterAuthBridge");
const { httpLogger } = require("./middleware/httpLogger");
const { sendReadinessResponse } = require("./utils/moderation/schemaReadiness");

const FILE_LIMIT = "3GB";
const STRIPE_WEBHOOK_PATH = "/api/billing/stripe/webhook";
const BETTER_AUTH_BRIDGE_PATH_PREFIX = "/api/auth/bridge/";
let betterAuthNodeHandlerPromise = null;

async function getBetterAuthNodeHandler() {
  if (!betterAuthNodeHandlerPromise) {
    betterAuthNodeHandlerPromise = Promise.all([
      import("./auth/better-auth.mjs"),
      import("better-auth/node"),
    ]).then(([{ auth }, { toNodeHandler }]) => toNodeHandler(auth));
  }

  return betterAuthNodeHandlerPromise;
}

function createApp({ enableWebSockets = true } = {}) {
  const app = express();
  const apiRouter = express.Router();

  if (
    process.env.NODE_ENV === "development" &&
    !!process.env.ENABLE_HTTP_LOGGER
  ) {
    app.use(
      httpLogger({
        enableTimestamps: !!process.env.ENABLE_HTTP_LOGGER_TIMESTAMPS,
      })
    );
  }

  app.use(cors({ origin: true }));
  app.all("/api/auth/*", async (request, response, next) => {
    if (request.path?.startsWith(BETTER_AUTH_BRIDGE_PATH_PREFIX)) {
      return next();
    }

    try {
      const authHandler = await getBetterAuthNodeHandler();
      return authHandler(request, response);
    } catch (error) {
      return next(error);
    }
  });
  app.use(bodyParser.text({ limit: FILE_LIMIT }));
  app.use(
    bodyParser.json({
      limit: FILE_LIMIT,
      verify: (request, _response, buffer) => {
        if (
          request.originalUrl?.startsWith(STRIPE_WEBHOOK_PATH) &&
          buffer?.length
        ) {
          request.rawBody = Buffer.from(buffer);
        }
      },
    })
  );
  app.use(
    bodyParser.urlencoded({
      limit: FILE_LIMIT,
      extended: true,
    })
  );

  if (enableWebSockets) {
    require("@mintplex-labs/express-ws").default(app);
  }

  app.use("/api", apiRouter);
  systemEndpoints(apiRouter);
  betterAuthBridgeEndpoints(apiRouter);
  extensionEndpoints(apiRouter);
  workspaceEndpoints(apiRouter);
  workspaceThreadEndpoints(apiRouter);
  chatEndpoints(apiRouter);
  adminEndpoints(apiRouter);
  inviteEndpoints(apiRouter);
  embedManagementEndpoints(apiRouter);
  utilEndpoints(apiRouter);
  documentEndpoints(apiRouter);
  if (enableWebSockets) {
    agentWebsocket(apiRouter);
  }
  experimentalEndpoints(apiRouter);
  developerEndpoints(app, apiRouter);
  communityHubEndpoints(apiRouter);
  agentFlowEndpoints(apiRouter);
  mcpServersEndpoints(apiRouter);
  mobileEndpoints(apiRouter);
  webPushEndpoints(apiRouter);
  billingEndpoints(apiRouter);
  embeddedEndpoints(apiRouter);
  browserExtensionEndpoints(apiRouter);

  app.get("/v1/api/health", async (_, response) => {
    await sendReadinessResponse(response, { force: true });
  });

  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NODE_ENV !== "test"
  ) {
    const { MetaGenerator } = require("./utils/boot/MetaGenerator");
    const IndexPage = new MetaGenerator();

    app.use(
      express.static(path.resolve(__dirname, "public"), {
        extensions: ["js"],
        setHeaders: (res) => {
          res.removeHeader("X-Powered-By");
          res.setHeader("X-Frame-Options", "DENY");
        },
      })
    );

    app.get("/robots.txt", function (_, response) {
      response.type("text/plain");
      response.send("User-agent: *\nDisallow: /").end();
    });

    app.get("/manifest.json", async function (_, response) {
      IndexPage.generateManifest(response);
      return;
    });

    app.use("/", function (_, response) {
      IndexPage.generate(response);
      return;
    });
  } else if (process.env.NODE_ENV === "development") {
    apiRouter.post("/v/:command", async (request, response) => {
      try {
        const VectorDb = getVectorDbClass();
        const { command } = request.params;
        if (!Object.getOwnPropertyNames(VectorDb).includes(command)) {
          response.status(500).json({
            message: "invalid interface command",
            commands: Object.getOwnPropertyNames(VectorDb),
          });
          return;
        }

        try {
          const body = reqBody(request);
          const resBody = await VectorDb[command](body);
          response.status(200).json({ ...resBody });
        } catch (e) {
          console.error(JSON.stringify(e));
          response.status(500).json({ error: e.message });
        }
        return;
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    });
  }

  app.all("*", function (_, response) {
    response.sendStatus(404);
  });

  return app;
}

module.exports = { createApp };
