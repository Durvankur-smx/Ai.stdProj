# Use Node.js LTS
FROM node:20-slim

# Install build tools if necessary
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install dependencies
# We copy package.json first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the frontend assets
RUN npm run build

# Set production environment
ENV NODE_ENV=production

# Cloud Run uses the PORT env var, but we expose 8080 as a default
EXPOSE 8080

# Start the server using tsx to handle the TypeScript entry point
CMD [ "npx", "tsx", "server.ts" ]
