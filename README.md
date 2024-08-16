# @bpgeck/semantic-release-kaniko

[![Version](https://img.shields.io/npm/v/@bpgeck/semantic-release-kaniko.svg)](https://www.npmjs.com/package/@bpgeck/semantic-release-kaniko)
[![License](https://img.shields.io/npm/l/@bpgeck/semantic-release-kaniko.svg)](https://github.com/brendangeck/semantic-release-kaniko/blob/main/LICENSE)

## Overview

[`@bpgeck/semantic-release-kaniko`](https://www.npmjs.com/package/@bpgeck/semantic-release-kaniko) is a plugin for `semantic-release` that builds and deploys Docker images in a daemonless environment using Google's open-source tool, [Kaniko](https://github.com/GoogleContainerTools/kaniko/).

From the [Kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md) docs:

> kaniko is a tool to build container images from a Dockerfile, inside a container or Kubernetes cluster.
>
> kaniko doesn't depend on a Docker daemon and executes each command within a Dockerfile completely in userspace. This enables building container images in environments that can't easily or securely run a Docker daemon, such as a standard Kubernetes cluster.

## Benefits

-   **Daemonless Container Building**: Builds images without requiring a Docker daemon or docker-in-docker setup, ideal for CI/CD environments.
-   **Secure Image Building**: Builds images in userspace, enhancing security by avoiding the need for root privileges.
-   **Version-Aware Tagging**: Automatically tags your Docker images with semantic version numbers, ensuring consistency between your code and container versions.
-   **Flexible Configuration**: Supports custom Dockerfile paths, multiple image tags, and various registry configurations to fit your specific needs.
-   **Cross-Platform Compatibility**: Works across different CI/CD platforms and environments that support Node.js and Kaniko.
-   **Automated Publishing**: Pushes built images to your specified Docker registry as part of the release process, reducing manual steps.

## Prerequisites

This package must be run in an environment that has Kaniko already installed. We provide a container image with all the necessary dependencies pre-installed, which we strongly recommend using. You can pull the container image with the following command:

```bash
docker pull ghcr.io/brendangeck/semantic-release-kaniko:latest
```

## Installation

To install, use the following command:

```bash
npm install --save-dev @bpgeck/semantic-release-kaniko
```

## Usage

Add `@bpgeck/semantic-release-kaniko` to your semantic-release configuration. Here are examples of different `.releaserc` file formats:

### YAML Example

```yaml
branches:
    - main
plugins:
    - '@semantic-release/commit-analyzer'
    - '@semantic-release/git'
    - - '@bpgeck/semantic-release-kaniko'
      - registry: 'registry.example.com'
        image: 'my-project/my-image'
        tags:
            - '${version}'
            - 'latest'
        username: ${DOCKER_USERNAME}
        password: ${DOCKER_PASSWORD}
        insecure: false
```

### JSON Example

```json
{
    "branches": ["main"],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/git",
        [
            "@bpgeck/semantic-release-kaniko",
            {
                "registry": "registry.example.com",
                "image": "my-project/my-image",
                "tags": ["${version}", "latest"],
                "username": "${DOCKER_USERNAME}",
                "password": "${DOCKER_PASSWORD}",
                "insecure": false
            }
        ]
    ]
}
```

### JavaScript Example

```javascript
module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/git',
        [
            '@bpgeck/semantic-release-kaniko',
            {
                registry: 'registry.example.com',
                image: 'my-project/my-image',
                tags: ['${version}', 'latest'],
                username: process.env.DOCKER_USERNAME,
                password: process.env.DOCKER_PASSWORD,
                insecure: false,
            },
        ],
    ],
};
```

## Example Workflows

Below are examples of how to use this package in popular CI environments.

### GitHub Actions

```yaml
name: Release

on:
    push:
        branches:
            - main

jobs:
    release:
        runs-on: ubuntu-latest
        container:
            image: ghcr.io/brendangeck/semantic-release-kaniko:latest
        steps:
            - name: Checkout code
              uses: actions/checkout@v3

            - name: Set up Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: '20.x'

            - name: Install dependencies
              run: npm ci

            - name: Release
              run: npx semantic-release
              env:
                  DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
                  DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
```

### GitLab CI

```yaml
stages:
    - release

release:
    stage: release
    image: ghcr.io/brendangeck/semantic-release-kaniko:latest
    script:
        - npm ci
        - npx semantic-release
    only:
        - main
    variables:
        DOCKER_USERNAME: $DOCKER_USERNAME
        DOCKER_PASSWORD: $DOCKER_PASSWORD
```

### CircleCI

```yaml
version: 2.1

executors:
    kaniko:
        docker:
            - image: ghcr.io/brendangeck/semantic-release-kaniko:latest

jobs:
    release:
        executor: kaniko
        steps:
            - checkout
            - run:
                  name: Install dependencies
                  command: npm ci
            - run:
                  name: Run semantic-release
                  command: npx semantic-release
                  environment:
                      DOCKER_USERNAME: $DOCKER_USERNAME
                      DOCKER_PASSWORD: $DOCKER_PASSWORD

workflows:
    version: 2
    release:
        jobs:
            - release:
                  filters:
                      branches:
                          only: main
```

## Configuration

| .releaserc | env var         | Description                                                                                                                          |
| ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| registry   | REGISTRY        | The Docker registry to push images to.                                                                                               |
| image      | IMAGE           | The Docker image name.                                                                                                               |
| tags       | TAGS            | An array of tags to apply to the Docker image. For env var, a comma-separated list of tags to apply to the image.                    |
| dockerfile | DOCKERFILE      | (Optional) The path to the Dockerfile to be built into a Docker image. Defaults to 'Dockerfile'                                      |
| username   | DOCKER_USERNAME | (Optional) The username for Docker registry authentication.                                                                          |
| password   | DOCKER_PASSWORD | (Optional) The password for Docker registry authentication.                                                                          |
| insecure   | INSECURE        | (Optional) Set to `true` to skip Docker registry TLS verification. This should be used only for testing or development environments. |
| target     | TARGET          | (Optional) The target build stage to build in a multi-stage Dockerfile.                                                              |
| cache      | CACHE           | (Optional) Set to `true` to enable caching in Kaniko.                                                                                |
| cacheTTL   | CACHE_TTL       | (Optional) TTL for cached layers. Cache must be set to `true`. Defaults to '24h' if cache is enabled.                                |
| kanikoDir  | KANIKO_DIR      | (Optional) Specify the directory where Kaniko will store its intermediate files, such as the image layers, during the build process  |

.releaserc configuration takes precedence over environment variables if both are provided.

## Contributing

We welcome contributions to semantic-release-kaniko!

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the contributors and the open-source community for their invaluable support and contributions.

For more information, visit the [official repository](https://github.com/brendangeck/semantic-release-kaniko).
