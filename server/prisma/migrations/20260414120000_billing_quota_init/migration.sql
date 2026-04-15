-- AlterTable
ALTER TABLE "users" ADD COLUMN "stripeCustomerId" TEXT;
ALTER TABLE "users" ADD COLUMN "stripeSubscriptionId" TEXT;
ALTER TABLE "users" ADD COLUMN "billingPlan" TEXT DEFAULT 'free';
ALTER TABLE "users" ADD COLUMN "billingStatus" TEXT DEFAULT 'inactive';
ALTER TABLE "users" ADD COLUMN "billingCurrentPeriodEnd" DATETIME;

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");
CREATE UNIQUE INDEX "users_stripeSubscriptionId_key" ON "users"("stripeSubscriptionId");
CREATE INDEX "users_billingStatus_idx" ON "users"("billingStatus");
