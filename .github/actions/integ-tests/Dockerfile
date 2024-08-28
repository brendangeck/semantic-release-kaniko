# Use Kaniko as the base image
FROM gcr.io/kaniko-project/executor:latest as kaniko

# Switch to a Node.js base image
FROM node:20.16.0-alpine

# Copy Kaniko executor from the Kaniko image
COPY --from=kaniko /kaniko/executor /kaniko/executor

# Github Actions mounts over the working directory, so we don't set WORDIR
# Learn about more Github Action behavior here: https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-docker-container-action

# Copy the entrypoint script into the image
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ARG testFile
ENTRYPOINT ["/entrypoint.sh", $testFile]
