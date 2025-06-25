#!/bin/bash
# Load nvm and use the project's designated Node.js version.
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use
echo "🚀 RecruitX development environment activated."
echo "✅ Using $(node -v)"
echo "✅ Using pnpm $(pnpm --version)"
# Start a new shell session to keep the environment active
exec $SHELL 