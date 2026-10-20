#!/bin/sh
set -eu
cat > /tmp/runtime-config.js <<EOF
window.__FIREBASE_CONFIG__ = {
  apiKey: "${VITE_FIREBASE_API_KEY:-}",
  authDomain: "${VITE_FIREBASE_AUTH_DOMAIN:-}",
  projectId: "${VITE_FIREBASE_PROJECT_ID:-}",
  appId: "${VITE_FIREBASE_APP_ID:-}"
};
EOF
exec "$@"
