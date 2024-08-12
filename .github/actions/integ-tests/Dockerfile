# Use Kaniko as the base image
FROM gcr.io/kaniko-project/executor:latest as kaniko

# Switch to a Node.js base image
FROM node:20.16.0-alpine

# Copy Kaniko executor from the Kaniko image
COPY --from=kaniko /kaniko/executor /kaniko/executor

# Github Actions mounts over the working directory, so we don't set WORDIR or COPY and files
# Learn about more Github Action behavior here: https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-docker-container-action

# Rely on entrypoint to do the install and run tests
ENTRYPOINT ["entrypoint.sh"]
