# Use the lightweight Alpine Linux version of Node.js
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install exact dependencies from package-lock.json
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Start the application
CMD ["node", "index.js"]