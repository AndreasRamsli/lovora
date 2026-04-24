CREATE UNIQUE INDEX IF NOT EXISTS "workspace_users_user_id_workspace_id_key"
ON "workspace_users"("user_id", "workspace_id");
