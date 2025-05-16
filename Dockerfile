# Use Node.js 18.x Alpine version for a smaller build image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the necessary port
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
