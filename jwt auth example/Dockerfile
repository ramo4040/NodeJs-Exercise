FROM node:18-alpine AS base

# dependencies stage
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

# runner stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Run Prisma migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
