#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { User } = require("../models/user");
const {
  reconcileBillingState,
} = require("../utils/billing/reconcileBillingState");

function parseArgs(argv = process.argv.slice(2)) {
  const args = Array.from(argv);
  const options = {
    user: null,
    customer: null,
    subscription: null,
    subscriptionProvided: false,
    apply: false,
  };

  while (args.length) {
    const token = args.shift();

    if (token === "--apply") {
      options.apply = true;
      continue;
    }

    if (token === "--user") {
      options.user = args.shift() || null;
      continue;
    }

    if (token === "--customer") {
      options.customer = args.shift() || null;
      continue;
    }

    if (token === "--subscription") {
      options.subscriptionProvided = true;
      options.subscription = args.shift() || null;
      continue;
    }
  }

  return options;
}

function readJsonInput(input = null) {
  if (!input) return null;

  const candidatePath = path.resolve(process.cwd(), input);
  const rawValue = fs.existsSync(candidatePath)
    ? fs.readFileSync(candidatePath, "utf8")
    : input;

  return JSON.parse(rawValue);
}

async function resolveUser(identifier = "") {
  const value = String(identifier || "").trim();
  if (!value) {
    throw new Error(
      "Usage: node server/scripts/reconcile-billing-state.js --user <username|id> [--customer <json|path>] [--subscription <json|path|null>] [--apply]"
    );
  }

  if (/^\d+$/.test(value)) {
    return User._get({ id: Number(value) });
  }

  return User._get({ username: value });
}

async function main(argv = process.argv.slice(2)) {
  const {
    user: requestedUser,
    customer,
    subscription,
    subscriptionProvided,
    apply,
  } = parseArgs(argv);

  if (apply && !subscriptionProvided) {
    throw new Error(
      "--apply requires explicit --subscription input so missing subscription data is not treated as authoritative absence."
    );
  }

  const user = await resolveUser(requestedUser);

  if (!user) {
    throw new Error(`Legacy user not found: ${requestedUser}`);
  }

  const result = reconcileBillingState({
    user,
    stripeCustomer: readJsonInput(customer),
    stripeSubscription: readJsonInput(subscription),
    now: new Date(),
  });

  if (apply && result.changed) {
    const updateResult = await User._update(user.id, result.updates);
    if (updateResult?.message) {
      throw new Error(updateResult.message);
    }
  }

  console.log(
    JSON.stringify(
      {
        success: true,
        applied: apply && result.changed,
        changed: result.changed,
        reason: result.reason,
        userId: user.id,
        username: user.username,
        updates: result.updates,
        nextState: result.nextState,
      },
      null,
      2
    )
  );
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  readJsonInput,
  resolveUser,
  main,
};
