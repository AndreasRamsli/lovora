#!/bin/bash
set -euo pipefail

PORT="${SERVER_PORT:-3001}"
response=$(
  curl --write-out '%{http_code}' --silent --output /dev/null \
    "http://localhost:${PORT}/api/health"
)

# If the HTTP response code is 200 (OK), the server is ready
if [ "$response" -eq 200 ]; then
  echo "Server is ready"
  exit 0
else
  echo "Server is not ready"
  exit 1
fi
