FROM node:26-alpine

WORKDIR /app

# Install dependencies only when needed
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all files
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "preview"]
