# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt application
RUN npm run build

# Expose port 3000 for the Nuxt server
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the Nuxt server
CMD ["npm", "run", "start"]
