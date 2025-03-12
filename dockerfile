# Use an appropriate base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Copy SSL certificates from backend directory
COPY ./ssl/client-cert.pem /app/ssl/client-cert.pem
COPY ./ssl/client-key.pem /app/ssl/client-key.pem

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]