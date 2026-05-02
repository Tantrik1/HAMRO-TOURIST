#!/bin/bash
# Hamro Tourist — Full Production Launch Script
# Run as: sudo bash launch.sh
# Expected to run from repo root: /home/ubuntu/HAMRO-TOURIST/

set -e
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Hamro Tourist — Launch Sequence   ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ─────────────────────────────────────────
# 1. INSTALL SYSTEM DEPENDENCIES
# ─────────────────────────────────────────
echo "► [1/7] Installing system dependencies..."

apt-get update -qq

# Docker
if ! command -v docker &>/dev/null; then
  echo "  Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
else
  echo "  Docker already installed: $(docker --version)"
fi

# Nginx
if ! command -v nginx &>/dev/null; then
  echo "  Installing Nginx..."
  apt-get install -y nginx
else
  echo "  Nginx already installed: $(nginx -v 2>&1)"
fi

# Node 20
if ! node --version 2>/dev/null | grep -q "v20"; then
  echo "  Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
else
  echo "  Node.js already installed: $(node --version)"
fi

# pnpm
if ! command -v pnpm &>/dev/null; then
  echo "  Installing pnpm..."
  npm install -g pnpm@9.15.0
else
  echo "  pnpm already installed: $(pnpm --version)"
fi

echo "  ✓ System dependencies ready"

# ─────────────────────────────────────────
# 2. SSL CERTIFICATES
# ─────────────────────────────────────────
echo ""
echo "► [2/7] Installing Cloudflare Origin Certificate..."

mkdir -p /etc/ssl/cloudflare

# Write the Origin Certificate (covers *.hamrotourist.com + hamrotourist.com)
cat > /etc/ssl/cloudflare/hamrotourist.pem << 'CERT'
-----BEGIN CERTIFICATE-----
MIIErDCCA5SgAwIBAgIUImK5Kgyj6+0Im0WWSRku5XuYYEEwDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTI2MDUwMjA3MTYwMFoXDTQxMDQyODA3MTYwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlT/Q54fiatgK5fE3aX18b+w5NHhZcWeKnkH
oLRZB5XikZyHmL2SIMiRKCQ5FUTCPMq8+mkmwfM4gtKp9xPMYpzkijPLh+RXQAoo
PI5s1J9tmoZ+3vm2cJDc/WoP8fpCrn+44+92cgbIGyiL8Yj9TzuZ99cDQ19077Rw
2bSNJ/AW3swGPxiFk5Sr25XW4zyd207GiK+TuyWE13co/U+LzOqTmP83P7xh3tXH
8qOsS+Zq3NCtzmpWSuxU8i97ugbqPluvh+iduJNEuve53uRW2zrar+6F/oaVqKbd
W8DGbAz6eBXA54xUx6oThGm6Kfm3sY04AS4Uv4kbdN6OTecOZwIDAQABo4IBLjCC
ASowDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBQd6Hqir/8Sod9dR/mK5SjOZp+X9zAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTAvBgNVHREEKDAmghIqLmhhbXJvdG91cmlzdC5jb22CEGhhbXJvdG91cmlzdC5j
b20wOAYDVR0fBDEwLzAtoCugKYYnaHR0cDovL2NybC5jbG91ZGZsYXJlLmNvbS9v
cmlnaW5fY2EuY3JsMA0GCSqGSIb3DQEBCwUAA4IBAQCTCNOeBl/95mUPGRzqslc4
R3IRAlM5MwSAFki9tNkP0aLTh1FZd6LzybysKrQH9lEaU8oKn3pVt82ajfqBbV8y
fqFP4pa6IjiOfnlbTbXXabCtl0eVJcLzIYQpsRs1iRF+0I83YFU5ty0723LLU4sy
vwKNwAx3PwpnFOsuB9O74UfAlhMWNh+8LktNt4RdwwlkpCGScA0XRM+A9evDytVo
sKe0S7Bt4j9eqUOEuzoLK5sgI9UrB77agPrGBnpPqsO7QjDQFkBGVlD7Q74ObrFU
zBBESGRk7otTH11XsTUzNFPcOtfr7A4FuK78nG5DycwuxldWSctRsexth81KLHwS
-----END CERTIFICATE-----
CERT

# Write the Origin Private Key
cat > /etc/ssl/cloudflare/hamrotourist.key << 'KEY'
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGVP9Dnh+Jq2Ar
l8TdpfXxv7Dk0eFlxZ4qeQegtFkHleKRnIeYvZIgyJEoJDkVRMI8yrz6aSbB8ziC
0qn3E8xinOSKM8uH5FdACig8jmzUn22ahn7e+bZwkNz9ag/x+kKuf7jj73ZyBsgb
KIvxiP1PO5n31wNDX3TvtHDZtI0n8BbezAY/GIWTlKvbldbjPJ3bTsaIr5O7JYTX
dyj9T4vM6pOY/zc/vGHe1cfyo6xL5mrc0K3OalZK7FTyL3u6Buo+W6+H6J24k0S6
97ne5FbbOtqv7oX+hpWopt1bwMZsDPp4FcDnjFTHqhOEabop+bexjTgBLhS/iRt0
3o5N5w5nAgMBAAECggEADArAHvpm/s8NfUgZ7L1KuWgX/6SwqKMUOeRJrsZp0MNB
05vV7dO2H3seDnpjOY6IXp7j/4Of608ZuMkSsczyxXAHk6PrxoSk5DSvAbzsuweH
ukX9RmDnZLP0VFylZYik638Xb5uBV7tgA1TLE8TAte1aqV4q4A3X20VbmWmpgmmp
aNg0FUPQBiRG2nTpJphwFVy4pI6etVQdcBAGP0I9zeGCpvfThniV7+Z1uMwUlhVV
6NGohKTklGBrnLMnxfKfZbjCEj7gHE7CRrgjXxjPDqAqFgWP0bStpxgwnht5la+L
0nXBbuENtPsnuHvbFblxol0Dh3c2Burq/AbXyssNlQKBgQD8FSo8wmIyrAE8tW2K
M1WrLsQPm96WrPB8eNSiDIC9k39v0mAON0pYI3hptTRJJEXhlW+zxfFHKgttdXDr
nwB+YpuAOXTE45dWE7SyQPtmcz65u2Zm9MOjAMJ66ac+kcicqmsMUlSw9o0PxiC9
IfVKaW0hi+gmgBFX9tkx34XI2wKBgQDJagBXxCb893KEMWumxvtlHhWaWmTubuzE
a59NGI6S20lqUhdAu2hkxxSQrEEYUpNm0UQXChvCQ0l+C4pTFnxFjo9g5djcwV7M
lCCuAR/cUQDEyIGcuI9htnlhtUqxF36yRmL3yyyD30wgiPfFjEGWIt2lsNT9q1m/
NPKIg21wZQKBgCXPbuRqK5x6HD1k4SdHh+QDQbktofdrvS6OWSZtRaopw4WcQngf
ZvFNcLQ6T7tgy3KInZaTbBtGfSxP3z4YPVS3qadT9uXJVVu93O6XvJ2jT5dAOp3a
vLVoWcNh5IoIB9Un4qKYfseEU6g4CZUU0Nv2cD4F5C5SK0fMaMuIQWLdAoGBAMEh
rbZ61k/XDq4HnYxMXR8228woRYQERXCLKjOJCp1zPFCA6t8dVRrdcrDPG5QxCjqb
C0l0Xe3HC5+bfUXy17Ly4jUt8OatXTOaDkQLu/tMiQoooXAf4Qz3Jik056wsNUbJ
C3lEDylcYukHrV52ASXvxM1uZK3hMquQH8gbDkOpAoGBALL6uCgT5+ME2MnsdaHp
MljfIhN3x3VZ3+Fb9ExAIyZfuHN8J26sI4uEhA/qCv0sw+xrg0l4f+30QU7bkYQh
FRjyI2QeU8CU5J8GGVq3fhbh1Va9r9Lb8iSAZZhtEK1G+SThv65Ahzk6fTciV5mS
8P37//riwoXkOuTzGr6BA5Gk
-----END PRIVATE KEY-----
KEY

chmod 600 /etc/ssl/cloudflare/hamrotourist.key
echo "  ✓ SSL certificates installed"

# ─────────────────────────────────────────
# 3. NGINX SETUP
# ─────────────────────────────────────────
echo ""
echo "► [3/7] Configuring Nginx..."

# Backup and replace main nginx.conf
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak 2>/dev/null || true
cp "$REPO_DIR/infra/nginx/nginx-main.conf" /etc/nginx/nginx.conf

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Copy all site configs
cp "$REPO_DIR/infra/nginx/hamrotourist.conf"         /etc/nginx/sites-enabled/
cp "$REPO_DIR/infra/nginx/api.hamrotourist.conf"     /etc/nginx/sites-enabled/
cp "$REPO_DIR/infra/nginx/app.hamrotourist.conf"     /etc/nginx/sites-enabled/
cp "$REPO_DIR/infra/nginx/tenants.hamrotourist.conf" /etc/nginx/sites-enabled/

nginx -t
systemctl enable nginx
systemctl restart nginx
echo "  ✓ Nginx configured and running"

# ─────────────────────────────────────────
# 4. START INFRASTRUCTURE (postgres + redis)
# ─────────────────────────────────────────
echo ""
echo "► [4/7] Starting infrastructure (postgres + redis)..."

cd "$REPO_DIR"
docker compose -f infra/docker/docker-compose.prod.yml up -d postgres redis

echo "  Waiting for postgres to be healthy..."
until docker compose -f infra/docker/docker-compose.prod.yml exec -T postgres pg_isready -U hamrotourist &>/dev/null; do
  sleep 2
done
echo "  ✓ Postgres ready"

echo "  Waiting for redis to be healthy..."
until docker compose -f infra/docker/docker-compose.prod.yml exec -T redis redis-cli ping | grep -q PONG; do
  sleep 2
done
echo "  ✓ Redis ready"

# ─────────────────────────────────────────
# 5. INSTALL DEPS + RUN MIGRATIONS
# ─────────────────────────────────────────
echo ""
echo "► [5/7] Installing dependencies and running migrations..."

cd "$REPO_DIR"
pnpm install --frozen-lockfile

# Run master schema migrations
pnpm db:migrate:master

echo "  ✓ Migrations complete"

# ─────────────────────────────────────────
# 6. BUILD ALL DOCKER IMAGES
# ─────────────────────────────────────────
echo ""
echo "► [6/7] Building all Docker images (this takes 10-20 minutes)..."

cd "$REPO_DIR"

# Build services sequentially to avoid OOM on smaller VMs
# NestJS services
for svc in api-gateway auth-service tenant-service product-service website-builder-service media-service domain-service crm-service notification-service; do
  echo "  Building $svc..."
  docker compose -f infra/docker/docker-compose.prod.yml build $svc
done

# Next.js apps
for app in admin-frontend website-renderer marketing-site; do
  echo "  Building $app..."
  docker compose -f infra/docker/docker-compose.prod.yml build $app
done

echo "  ✓ All images built"

# ─────────────────────────────────────────
# 7. START ALL SERVICES
# ─────────────────────────────────────────
echo ""
echo "► [7/7] Starting all services..."

docker compose -f infra/docker/docker-compose.prod.yml up -d

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║          Hamro Tourist is LIVE!                     ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Marketing   → https://hamrotourist.com             ║"
echo "║  Admin       → https://app.hamrotourist.com         ║"
echo "║  API         → https://api.hamrotourist.com/api     ║"
echo "║  Tenants     → https://<slug>.hamrotourist.com      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "Check container status:"
echo "  docker compose -f infra/docker/docker-compose.prod.yml ps"
echo ""
echo "View logs:"
echo "  docker compose -f infra/docker/docker-compose.prod.yml logs -f"
echo ""
echo "NOTE: Add your RESEND_API_KEY to .env when ready, then restart notification-service:"
echo "  docker compose -f infra/docker/docker-compose.prod.yml restart notification-service"
