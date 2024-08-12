# Use Kaniko as the base image
FROM gcr.io/kaniko-project/executor:latest as kaniko

# Switch to a Node.js base image
FROM node:20.16.0-alpine

# Copy Kaniko executor from the Kaniko image
COPY --from=kaniko /kaniko/executor /kaniko/executor

# We don't do any copying of files in this image, because Github Actions will mount over any copied
# files with the contents of ${GITHUB_WORKSPACE}
# Learn about more Github Action behavior here: https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-docker-container-action

COPY . ./app

# Confirm file contents
RUN ls -la ./app