#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const DEFAULT_PROMPT_FILE = path.resolve(
  "scripts/prompts/lovora_alpha_system_prompt.txt"
);

function printHelp() {
  console.log(`Usage:
  node scripts/apply-alpha-system-prompt.cjs [options]

Options:
  --workspace <slug>              Workspace slug. Default: lovora-alpha
  --prompt-file <path>            Prompt text file.
                                  Default: scripts/prompts/lovora_alpha_system_prompt.txt
  --api-base <url>                API base URL.
                                  Default: ANYTHINGLLM_BASE_URL or http://localhost:3001/api
  --management-api-key <key>      Management API key.
                                  Default: ANYTHINGLLM_MANAGEMENT_API_KEY or ANYTHINGLLM_API_KEY
  --dry-run                       Print target and prompt digest without updating.
  --print                         Print the prompt text before dry-run/update.
  --help                          Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    workspace: "lovora-alpha",
    promptFile: DEFAULT_PROMPT_FILE,
    apiBase: (process.env.ANYTHINGLLM_BASE_URL || "http://localhost:3001/api").replace(
      /\/$/,
      ""
    ),
    managementApiKey:
      process.env.ANYTHINGLLM_MANAGEMENT_API_KEY ||
      process.env.ANYTHINGLLM_API_KEY ||
      "",
    dryRun: false,
    print: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "--workspace") args.workspace = argv[++index];
    else if (arg === "--prompt-file") args.promptFile = path.resolve(argv[++index]);
    else if (arg === "--api-base") args.apiBase = argv[++index].replace(/\/$/, "");
    else if (arg === "--management-api-key") args.managementApiKey = argv[++index];
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--print") args.print = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.workspace) throw new Error("--workspace is required.");
  if (!args.promptFile) throw new Error("--prompt-file is required.");
  if (!args.managementApiKey && !args.dryRun) {
    throw new Error(
      "--management-api-key or ANYTHINGLLM_MANAGEMENT_API_KEY is required unless using --dry-run."
    );
  }

  return args;
}

function readPrompt(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Prompt file does not exist: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8").trimEnd();
}

function promptDigest(prompt) {
  return crypto.createHash("sha256").update(prompt).digest("hex");
}

function buildWorkspaceUpdateRequest(args, prompt) {
  return {
    url: `${args.apiBase}/v1/workspace/${encodeURIComponent(args.workspace)}/update`,
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.managementApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ openAiPrompt: prompt }),
    },
  };
}

async function applyPrompt(args, deps = {}) {
  const fetchImpl = deps.fetch || fetch;
  const logger = deps.logger || console;
  const prompt = readPrompt(args.promptFile);
  const digest = promptDigest(prompt);
  const request = buildWorkspaceUpdateRequest(args, prompt);

  if (args.print) logger.log(prompt);

  if (args.dryRun) {
    logger.log(`[alpha-prompt] workspace=${args.workspace}`);
    logger.log(`[alpha-prompt] promptFile=${args.promptFile}`);
    logger.log(`[alpha-prompt] sha256=${digest}`);
    logger.log(`[alpha-prompt] bytes=${Buffer.byteLength(prompt, "utf8")}`);
    return { dryRun: true, digest, prompt };
  }

  const response = await fetchImpl(request.url, request.options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Workspace prompt update failed: ${response.status} ${text.slice(0, 300)}`
    );
  }

  const payload = await response.json();
  logger.log(`[alpha-prompt] updated workspace=${args.workspace}`);
  logger.log(`[alpha-prompt] sha256=${digest}`);
  return { dryRun: false, digest, payload };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await applyPrompt(args);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error?.message || error);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  readPrompt,
  promptDigest,
  buildWorkspaceUpdateRequest,
  applyPrompt,
  main,
};
