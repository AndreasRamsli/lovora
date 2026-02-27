FROM mintplexlabs/anythingllm:latest

USER root

# Install supervisor and curl
RUN apt-get update && apt-get install -y supervisor curl && rm -rf /var/lib/apt/lists/*

# Install cloudflared
RUN curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared

# Copy supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/lovora.conf

USER anythingllm

EXPOSE 3001

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
