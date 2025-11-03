FROM node:20-slim

WORKDIR /app

# Build deps for native modules like better-sqlite3
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

# Ensure node-gyp uses python3
ENV npm_config_python=/usr/bin/python3

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Prefer npm ci when lockfile exists
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    else npm install; fi

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Create runtime dirs
RUN mkdir -p server/data server/uploads

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/index.js"]
