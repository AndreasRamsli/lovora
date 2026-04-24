const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const DEFAULT_PROCESSING_LEASE_MS = 5 * 60 * 1000;

const StripeWebhookEvent = {
  statuses: {
    processing: "processing",
    processed: "processed",
    failed: "failed",
  },

  serializePayload: function (event = null) {
    if (!event) return null;

    try {
      return JSON.stringify(event);
    } catch {
      return null;
    }
  },

  getProcessingLeaseMs: function () {
    const parsedValue = Number(process.env.STRIPE_WEBHOOK_PROCESSING_LEASE_MS);
    if (Number.isNaN(parsedValue) || parsedValue < 1000) {
      return DEFAULT_PROCESSING_LEASE_MS;
    }
    return Math.floor(parsedValue);
  },

  isProcessingLeaseStale: function (record = null, now = new Date()) {
    if (!record?.lastUpdatedAt) return true;
    const lastUpdatedAt = new Date(record.lastUpdatedAt);
    if (Number.isNaN(lastUpdatedAt.getTime())) return true;
    return (
      now.getTime() - lastUpdatedAt.getTime() > this.getProcessingLeaseMs()
    );
  },

  getByStripeEventId: async function (stripeEventId = "") {
    try {
      if (!stripeEventId) return null;
      const event = await prisma.stripe_webhook_events.findUnique({
        where: { stripeEventId: String(stripeEventId) },
      });
      return event || null;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  buildClaimData: function (event = {}) {
    return {
      stripeEventId: String(event?.id || "").trim(),
      eventType: String(event?.type || "unknown"),
      livemode: Boolean(event?.livemode),
      status: this.statuses.processing,
      payload: this.serializePayload(event),
      processedAt: null,
      lastError: null,
    };
  },

  reclaimExisting: async function (
    existing = null,
    data = {},
    now = new Date()
  ) {
    if (!existing) return { claimed: false, event: null };

    if (existing.status === this.statuses.processed) {
      return { claimed: false, event: existing };
    }

    if (existing.status === this.statuses.processing) {
      if (!this.isProcessingLeaseStale(existing, now)) {
        return { claimed: false, event: existing };
      }
    } else if (existing.status !== this.statuses.failed) {
      return { claimed: false, event: existing };
    }

    const reclaimResult = await prisma.stripe_webhook_events.updateMany({
      where: {
        id: existing.id,
        status: existing.status,
        lastUpdatedAt: existing.lastUpdatedAt,
      },
      data,
    });

    if (reclaimResult.count !== 1) {
      return {
        claimed: false,
        event: await this.getByStripeEventId(existing.stripeEventId),
      };
    }

    return {
      claimed: true,
      event: await prisma.stripe_webhook_events.findUnique({
        where: { id: existing.id },
      }),
    };
  },

  claim: async function (event = {}, now = new Date()) {
    const data = this.buildClaimData(event);
    if (!data.stripeEventId) throw new Error("Stripe event id is required.");

    const existing = await this.getByStripeEventId(data.stripeEventId);
    if (existing) {
      return this.reclaimExisting(existing, data, now);
    }

    try {
      const claimedEvent = await prisma.stripe_webhook_events.create({ data });
      return { claimed: true, event: claimedEvent };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const racedEvent = await this.getByStripeEventId(data.stripeEventId);
        return this.reclaimExisting(racedEvent, data, now);
      }
      throw error;
    }
  },

  markProcessed: async function (id = null) {
    if (!id) return null;

    try {
      return await prisma.stripe_webhook_events.update({
        where: { id: Number(id) },
        data: {
          status: this.statuses.processed,
          processedAt: new Date(),
          lastError: null,
        },
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  markFailed: async function (id = null, error = null) {
    if (!id) return null;

    try {
      return await prisma.stripe_webhook_events.update({
        where: { id: Number(id) },
        data: {
          status: this.statuses.failed,
          lastError: error?.message ? String(error.message) : null,
        },
      });
    } catch (updateError) {
      console.error(updateError.message);
      return null;
    }
  },
};

module.exports = { StripeWebhookEvent };
