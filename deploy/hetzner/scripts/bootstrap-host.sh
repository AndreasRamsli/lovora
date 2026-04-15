#!/usr/bin/env bash
set -euo pipefail

error() {
  echo "Error: $*" >&2
}

require_root() {
  if [[ "${EUID}" -ne 0 ]]; then
    error "run this script as root with sudo"
    exit 1
  fi
}

main() {
  require_root

  export DEBIAN_FRONTEND=noninteractive

  apt-get update
  apt-get install -y \
    ca-certificates \
    curl \
    docker.io \
    docker-compose-plugin \
    fail2ban \
    git \
    jq \
    lsb-release \
    sqlite3 \
    ufw \
    unattended-upgrades

  systemctl enable --now docker
  systemctl enable --now fail2ban

  install -d -m 755 /srv/lovora
  # The deploy bundle lives under the nested app repo, so match that runtime layout.
  install -d -m 755 /srv/lovora/lovora/.data/hetzner/server/storage
  install -d -m 755 /srv/lovora/lovora/.data/hetzner/collector/hotdir
  install -d -m 755 /srv/lovora/lovora/.data/hetzner/collector/outputs
  install -d -m 755 /srv/lovora/backups

  cat >/etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF

  systemctl enable apt-daily.timer
  systemctl enable apt-daily-upgrade.timer
  systemctl start apt-daily.timer
  systemctl start apt-daily-upgrade.timer

  ufw default deny incoming
  ufw default allow outgoing
  ufw allow 22/tcp
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable

  echo "Hetzner host bootstrap complete."
}

main "$@"
