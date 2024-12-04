# Use Node.js official image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the app on port 3000 (can be adjusted in the deploy script)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
