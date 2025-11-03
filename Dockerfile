# Multi-stage build for Vite + React app
# 1) Build static assets with Node
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* bun.lockb* ./
RUN npm ci || npm i

# Copy the rest of the project
COPY . .

# Pass Supabase env at build-time so Vite can inline them
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}

# Build for production (outputs to dist/)
RUN npm run build

# 2) Serve with Nginx as a static site (SPA)
FROM nginx:1.27-alpine AS runner

# Replace default server config with SPA-friendly one
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
