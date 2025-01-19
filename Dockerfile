# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Development stage
FROM builder AS development
ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Build for production
FROM builder AS production-build
RUN npm run build

# Production stage
FROM nginx:alpine AS production
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets from production-build stage
COPY --from=production-build /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=20s \
  CMD ["wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 