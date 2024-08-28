# First stage: Build stage
FROM scratch AS build

# Create a file in the first stage
# Since 'scratch' doesn't have utilities, simulate by using ARG
ARG BUILD_CONTENT="This is content from the build stage"
ENV BUILD_OUTPUT="${BUILD_CONTENT}"

# Second stage: Final stage
FROM scratch AS final

# ARG used in the final stage
ARG TEST_ARG

# Set a simple environment variable in the final stage
ENV TEST_ENV="semantic-release-kaniko"
ENV FINAL_CONTENT="${BUILD_OUTPUT}"

# Define an empty CMD
CMD []
