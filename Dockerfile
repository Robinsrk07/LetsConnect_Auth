# Build stage
FROM node:20.12.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# Final stage
FROM node:20.12.1-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
