const Stripe = require("stripe");

let stripeClient = null;

function getStripeClient() {
  if (stripeClient) return stripeClient;

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
  });

  return stripeClient;
}

module.exports = {
  getStripeClient,
};
