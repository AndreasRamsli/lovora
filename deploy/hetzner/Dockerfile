FROM ubuntu:noble-20251013 AS base

ARG ARG_UID=1000
ARG ARG_GID=1000

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
      unzip curl gnupg libgfortran5 libgbm1 tzdata netcat-openbsd supervisor \
      libasound2t64 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 \
      libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
      libxss1 libxtst6 ca-certificates fonts-liberation libappindicator3-1 libnss3 lsb-release \
      xdg-utils git build-essential ffmpeg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
      gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | \
      tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -yq --no-install-recommends nodejs && \
    curl -LO https://github.com/yarnpkg/yarn/releases/download/v1.22.19/yarn_1.22.19_all.deb && \
    dpkg -i yarn_1.22.19_all.deb && \
    rm yarn_1.22.19_all.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN (getent passwd "$ARG_UID" && userdel -f "$(getent passwd "$ARG_UID" | cut -d: -f1)") || true && \
    (getent group "$ARG_GID" && groupdel "$(getent group "$ARG_GID" | cut -d: -f1)") || true && \
    groupadd -g "$ARG_GID" anythingllm && \
    useradd -l -u "$ARG_UID" -m -d /home/anythingllm -s /bin/bash -g anythingllm anythingllm && \
    mkdir -p /app/frontend /app/server /app/collector && \
    chown -R anythingllm:anythingllm /app /home/anythingllm

FROM --platform=$BUILDPLATFORM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --network-timeout 100000 && yarn cache clean
COPY ./frontend/ ./
RUN yarn build

FROM base AS backend-build
COPY --chown=anythingllm:anythingllm ./server /app/server/
WORKDIR /app/server
RUN yarn install --production --network-timeout 100000 && yarn cache clean

COPY --chown=anythingllm:anythingllm ./collector /app/collector/
WORKDIR /app/collector
ENV PUPPETEER_DOWNLOAD_BASE_URL=https://storage.googleapis.com/chrome-for-testing-public
RUN yarn install --production --network-timeout 100000 && yarn cache clean

FROM base AS production
USER root
WORKDIR /app

COPY --chown=anythingllm:anythingllm --from=frontend-build /app/frontend/dist /app/server/public
COPY --chown=anythingllm:anythingllm --from=backend-build /app/server /app/server
COPY --chown=anythingllm:anythingllm --from=backend-build /app/collector /app/collector
COPY deploy/hetzner/supervisord.conf /etc/supervisor/conf.d/lovora.conf
COPY deploy/hetzner/entrypoint.sh /usr/local/bin/lovora-entrypoint.sh

RUN mkdir -p /var/log/supervisor /app/server/storage /app/server/storage/documents \
      /app/server/storage/vector-cache /app/server/storage/lancedb \
      /app/collector/hotdir /app/collector/outputs && \
    chmod +x /usr/local/bin/lovora-entrypoint.sh && \
    chown -R anythingllm:anythingllm /var/log/supervisor /app

ENV NODE_ENV=production
ENV ANYTHING_LLM_RUNTIME=docker

EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/lovora-entrypoint.sh"]
