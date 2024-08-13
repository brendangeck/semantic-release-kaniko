# Use Kaniko as the base image
FROM gcr.io/kaniko-project/executor:latest as kaniko

# Switch to a Node.js base image
FROM node:20.16.0-alpine

# Copy Kaniko executor from the Kaniko image
COPY --from=kaniko /kaniko/executor /kaniko/executor

# Set up working directory
WORKDIR /app

# Install git
RUN apk add --no-cache git

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i
