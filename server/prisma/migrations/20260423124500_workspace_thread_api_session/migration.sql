ALTER TABLE "workspace_threads" ADD COLUMN "api_session_id" TEXT;

CREATE INDEX "workspace_threads_api_session_id_idx"
ON "workspace_threads"("api_session_id");
