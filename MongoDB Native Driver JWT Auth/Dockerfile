# Base image
FROM node:18-alpine As base

# Dependencies stage
FROM base As deps
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev

# Builder stage
FROM base As builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json .
COPY . .
RUN npm i && npm run build

# Runner stage (based on Alpine for utilities)
FROM alpine:latest As runner
WORKDIR /app

RUN apk update && apk add --no-cache nodejs npm 

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "./dist/src/app.js"]