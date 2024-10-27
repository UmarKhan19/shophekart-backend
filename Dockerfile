FROM node:current-alpine

# Set the working directory
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Run the application
CMD ["node", "./dist/server.js"]
