# @bpgeck/semantic-release-kaniko

[![Version](https://img.shields.io/npm/v/semantic-release-kaniko.svg)](https://www.npmjs.com/package/@bpgeck/semantic-release-kaniko)
[![License](https://img.shields.io/npm/l/semantic-release-kaniko.svg)](https://github.com/brendangeck/semantic-release-kaniko/blob/main/LICENSE)

## Overview

[`@bpgeck/semantic-release-kaniko`](https://www.npmjs.com/package/@bpgeck/semantic-release-kaniko) is a plugin for `semantic-release` that builds and deploys of Docker images in a daemonless environment using Google's open-source tool, [Kaniko](https://github.com/GoogleContainerTools/kaniko/).

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

## Installation

To install run the following command:

```bash
npm install --save-dev @bpgeck/semantic-release-kaniko
```

## Usage

Add semantic-release-kaniko to your semantic-release configuration:

With YAML
```yaml
branches:
  - main
plugins:
  - '@semantic-release/commit-analyzer'
  - '@semantic-release/git'
  - '@bpgeck/semantic-release-kaniko':
      registry: 'registry.example.com'
      project: 'my-project'
      image: 'my-image'
      tags:
        - '${version}'
        - 'latest'
      username: ${DOCKER_USERNAME}
      password: ${DOCKER_PASSWORD}
      insecure: false
```

With JSON
```
module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/git',
        [
            '@bpgeck/semantic-release-kaniko',
            {
                registry: 'registry.example.com',
                project: 'my-project',
                image: 'my-image',
                tags: ['${version}', 'latest'],
                username: process.env.DOCKER_USERNAME,
                password: process.env.DOCKER_PASSWORD,
                insecure: false,
            },
        ],
    ],
};
```

## Configuration

| Option   | Description                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| registry | The Docker registry to push images to.                                                                                               |
| project  | The project name in the Docker registry.                                                                                             |
| image    | The Docker image name.                                                                                                               |
| tags     | An array of tags to apply to the Docker image.                                                                                       |
| username | (Optional) The username for Docker registry authentication.                                                                          |
| password | (Optional) The password for Docker registry authentication.                                                                          |
| insecure | (Optional) Set to `true` to skip Docker registry TLS verification. This should be used only for testing or development environments. |

## Contributing

We welcome contributions to semantic-release-kaniko!

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the contributors and the open-source community for their invaluable support and contributions.

For more information, visit the [official repository](https://github.com/brendangeck/semantic-release-kaniko).
