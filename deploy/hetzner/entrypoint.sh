#!/bin/bash
set -euo pipefail

mkdir -p /app/server/storage /app/server/storage/documents \
  /app/server/storage/vector-cache /app/server/storage/lancedb \
  /app/collector/hotdir /app/collector/outputs

chown -R anythingllm:anythingllm /app/server /app/collector /var/log/supervisor 2>/dev/null || true

exec /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
