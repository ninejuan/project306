FROM node:20.10.0-alpine

WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Build the Next.js application
RUN npm build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
