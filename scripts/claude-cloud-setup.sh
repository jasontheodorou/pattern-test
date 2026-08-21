#!/usr/bin/env bash
# Symphonia cloud setup — only runs in Claude Code cloud/remote sessions.
# Idempotent: no-op when node_modules is already present.
set -euo pipefail

if [ -z "${CLAUDE_CODE_REMOTE:-}" ] && [ -z "${CLAUDE_CLOUD:-}" ]; then
  exit 0
fi

if [ -d node_modules ] && [ -f node_modules/.package-lock.json ]; then
  exit 0
fi

echo "symphonia · installing dependencies via npm ci"
npm ci
