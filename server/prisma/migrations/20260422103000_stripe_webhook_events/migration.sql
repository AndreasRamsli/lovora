-- CreateTable
CREATE TABLE "stripe_webhook_events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stripeEventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "livemode" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "payload" TEXT,
    "processedAt" DATETIME,
    "lastError" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "stripe_webhook_events_stripeEventId_key" ON "stripe_webhook_events"("stripeEventId");
CREATE INDEX "stripe_webhook_events_status_idx" ON "stripe_webhook_events"("status");
CREATE INDEX "stripe_webhook_events_eventType_idx" ON "stripe_webhook_events"("eventType");
