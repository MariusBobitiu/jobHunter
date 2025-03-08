# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the Vite project
RUN npm run build

# Install 'serve' to host the built files
RUN npm install -g serve

# Expose the port Vite will serve on
EXPOSE 4173

# Serve the build folder
CMD ["serve", "-s", "dist", "-l", "4173"]