# @bpgeck/semantic-release-kaniko

[![Version](https://img.shields.io/npm/v/@bpgeck/semantic-release-kaniko.svg)](https://www.npmjs.com/package/@bpgeck/semantic-release-kaniko)
[![License](https://img.shields.io/npm/l/@bpgeck/semantic-release-kaniko.svg)](https://github.com/brendangeck/semantic-release-kaniko/blob/main/LICENSE)
![CI](https://github.com/brendangeck/semantic-release-kaniko/actions/workflows/ci.yml/badge.svg)

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

## Quick Start

Installation is done with the `npm install` command:

```bash
npm install --save-dev @bpgeck/semantic-release-kaniko
```

Add the plugin to your [semantic-release](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file) `.releaserc` file:

```json
{
    "branches": ["main"],
    "plugins": [
        "@semantic-release/commit-analyzer",
        [
            "@bpgeck/semantic-release-kaniko",
            {
                "destination": [
                    "registry.example.com/my-project/my-image:${version}",
                    "registry.example.com/my-project/my-image:latest"
                ]
            }
        ]
    ]
}
```

This package must be run in an environment that has Kaniko already installed. We provide a image with all the necessary dependencies pre-installed, which we strongly recommend using. Pull the container image:

```bash
docker pull ghcr.io/brendangeck/semantic-release-kaniko:latest
```

Run your semantic-release command in the container:

```
docker run --rm \
    -v $(pwd):/workspace \
    -name semantic-release-kaniko-test \
    ghcr.io/brendangeck/semantic-release-kaniko:latest \
    npx semantic-release
```

## Advanced Usage

For more advanced usage and detailed configuration options, including setting custom Dockerfile paths, custom registry configurations, as well as guidance on multiple CI environments and documentation for all supported flags, please refer to the [Usage Guide](docs/usage.md) or the [Configuration Guide](docs/configuration.md).

## Contributing

We welcome contributions to semantic-release-kaniko! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the contributors and the open-source community for their invaluable support and contributions.

For more information, visit the [official repository](https://github.com/brendangeck/semantic-release-kaniko).
