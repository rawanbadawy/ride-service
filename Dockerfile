# Use official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install all dependencies, including Prisma
RUN npm install

# Copy the rest of the application code
COPY . .

# Make sure prisma has executable permissions
RUN chmod +x ./node_modules/.bin/prisma

# Run Prisma generate to ensure the Prisma Client is generated correctly
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "run", "start"]
