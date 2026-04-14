# Base Image
FROM oven/bun:alpine

# Working directory inside container
WORKDIR /app

# Install dependencies first
COPY package.json ./
COPY bun.lock ./
RUN bun install

# Copy full project
COPY . .

# Expose  port
EXPOSE 4000

# Start in development mode with watch
CMD ["bun", "dev"]
