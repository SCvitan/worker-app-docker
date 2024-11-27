# Step 1: Use the official Node.js image
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Create the final image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app /app

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
