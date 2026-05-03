#!/bin/bash
# Run on the VM as root: sudo bash install.sh
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Installing nginx..."
apt-get update -qq
apt-get install -y nginx

echo "==> Backing up default nginx.conf..."
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak

echo "==> Copying nginx configs..."
cp "$SCRIPT_DIR/nginx-main.conf"       /etc/nginx/nginx.conf
cp "$SCRIPT_DIR/hamrotourist.conf"     /etc/nginx/sites-enabled/hamrotourist.conf
cp "$SCRIPT_DIR/api.hamrotourist.conf" /etc/nginx/sites-enabled/api.hamrotourist.conf
cp "$SCRIPT_DIR/app.hamrotourist.conf" /etc/nginx/sites-enabled/app.hamrotourist.conf
cp "$SCRIPT_DIR/tenants.hamrotourist.conf" /etc/nginx/sites-enabled/tenants.hamrotourist.conf

# Remove default nginx site if it exists
rm -f /etc/nginx/sites-enabled/default

echo "==> Testing nginx config..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx

echo ""
echo "✅ Nginx installed and configured!"
echo ""
echo "Next: Install Cloudflare Origin Certificate for SSL"
echo "See: infra/nginx/SETUP-GUIDE.md"
