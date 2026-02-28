FROM mintplexlabs/anythingllm:latest

USER root

# Install supervisor and curl
RUN apt-get update && apt-get install -y supervisor curl && rm -rf /var/lib/apt/lists/*

# Install cloudflared
RUN curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared

# Copy supervisor config and entrypoint
COPY supervisord.conf /etc/supervisor/conf.d/lovora.conf
COPY entrypoint.sh /usr/local/bin/lovora-entrypoint.sh

# Create log dir and set permissions
RUN mkdir -p /var/log/supervisor && chmod 755 /var/log/supervisor && \
    chmod +x /usr/local/bin/lovora-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/lovora-entrypoint.sh"]
