CREATE TABLE "conversation_flags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceType" TEXT NOT NULL DEFAULT 'workspace_chat',
    "chatId" INTEGER NOT NULL,
    "userId" INTEGER,
    "workspaceId" INTEGER NOT NULL,
    "threadId" INTEGER,
    "riskLevel" TEXT NOT NULL DEFAULT 'review',
    "categories" TEXT,
    "matchedRules" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "resolution" TEXT NOT NULL DEFAULT 'none',
    "reviewedBy" INTEGER,
    "reviewedAt" DATETIME,
    "reviewNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "conversation_flags_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "workspace_chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "conversation_flags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "conversation_flags_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "conversation_flags_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "workspace_threads" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "conversation_flags_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "conversation_flags_chatId_key" ON "conversation_flags"("chatId");
CREATE INDEX "conversation_flags_userId_idx" ON "conversation_flags"("userId");
CREATE INDEX "conversation_flags_workspaceId_idx" ON "conversation_flags"("workspaceId");
CREATE INDEX "conversation_flags_threadId_idx" ON "conversation_flags"("threadId");
CREATE INDEX "conversation_flags_status_idx" ON "conversation_flags"("status");
