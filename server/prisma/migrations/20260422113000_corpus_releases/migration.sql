-- CreateTable
CREATE TABLE "corpus_releases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "releaseId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "workspaceSlug" TEXT NOT NULL,
    "sourceDatasetVersion" TEXT NOT NULL,
    "manifestVersion" TEXT NOT NULL,
    "manifestPath" TEXT,
    "manifestChecksum" TEXT NOT NULL,
    "manifestRecordCount" INTEGER,
    "documentCount" INTEGER NOT NULL,
    "sectionCount" INTEGER NOT NULL,
    "embeddingModel" TEXT NOT NULL,
    "chunkSize" INTEGER NOT NULL,
    "chunkOverlap" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "evaluationSummary" TEXT,
    "uploadedAt" DATETIME,
    "activatedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "corpus_releases_workspaceSlug_fkey" FOREIGN KEY ("workspaceSlug") REFERENCES "workspaces" ("slug") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "corpus_releases_releaseId_key" ON "corpus_releases"("releaseId");
CREATE UNIQUE INDEX "corpus_releases_single_active_workspace_idx" ON "corpus_releases"("workspaceSlug") WHERE "status" = 'active';
CREATE INDEX "corpus_releases_workspaceSlug_status_idx" ON "corpus_releases"("workspaceSlug", "status");
CREATE INDEX "corpus_releases_workspaceSlug_createdAt_idx" ON "corpus_releases"("workspaceSlug", "createdAt");
CREATE INDEX "corpus_releases_status_activatedAt_idx" ON "corpus_releases"("status", "activatedAt");
