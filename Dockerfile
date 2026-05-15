# Base image
FROM oven/bun:alpine

# Working directory
WORKDIR /app

# Copy root dependency files
COPY package.json ./
COPY bun.lock ./

# Install ALL dependencies
RUN bun install

# Copy source files
COPY . .

# Expose backend port
EXPOSE 4000
EXPOSE 3000

# Start backend
CMD ["bun", "run", "dev"]
