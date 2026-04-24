-- AlterTable
ALTER TABLE "api_keys" ADD COLUMN "name" TEXT;
ALTER TABLE "api_keys" ADD COLUMN "principalType" TEXT NOT NULL DEFAULT 'management';
ALTER TABLE "api_keys" ADD COLUMN "workspaceId" INTEGER;
ALTER TABLE "api_keys" ADD COLUMN "scopes" TEXT;

-- Backfill legacy rows
UPDATE "api_keys"
SET "principalType" = 'management'
WHERE "principalType" IS NULL OR "principalType" = '';

UPDATE "api_keys"
SET "scopes" = '["management:metadata:read","management:metadata:write","management:moderation:write","management:users:read","management:users:write"]'
WHERE "scopes" IS NULL OR "scopes" = '';

-- CreateIndex
CREATE INDEX "api_keys_principalType_idx" ON "api_keys"("principalType");
CREATE INDEX "api_keys_workspaceId_idx" ON "api_keys"("workspaceId");
