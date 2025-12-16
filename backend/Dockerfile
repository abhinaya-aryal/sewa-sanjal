# Base Image
FROM node:24-alpine

# Working directory inside container
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Expose nest default port
EXPOSE 4000

# Start in development mode with watch
CMD ["npm", "run", "start:dev"]
