# semantic-release-kaniko

[![Version](https://img.shields.io/npm/v/semantic-release-kaniko.svg)](https://www.npmjs.com/package/semantic-release-kaniko)
[![License](https://img.shields.io/npm/l/semantic-release-kaniko.svg)](https://github.com/brendangeck/semantic-release-kaniko/blob/main/LICENSE)

## Overview

`semantic-release-kaniko` is a powerful and efficient plugin for `semantic-release` that facilitates the building and deployment of Docker images in a daemonless environment using Kaniko. This plugin is designed to streamline your CI/CD pipeline by leveraging Kaniko's advanced container management capabilities.

## Features

-   **Daemonless Operation**: Utilizes Kaniko to build and publish containers without requiring a running daemon.
-   **Automated Docker Image Management**: Automatically builds and pushes Docker images based on your semantic versioning strategy.
-   **Cross-Platform Support**: Compatible with major operating systems including macOS, Linux, and Windows.
-   **Seamless Integration**: Easily integrates with existing `semantic-release` workflows.

## Installation

To install `semantic-release-kaniko`, run the following command:

npm install --save-dev semantic-release-kaniko

## Usage

Add semantic-release-kaniko to your semantic-release configuration:

```
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/git",
        "semantic-release-kaniko"
    ]
}
```

Configure the plugin in your release.config.js:

```
module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/git',
        [
            'semantic-release-kaniko',
            {
                registry: 'registry.example.com',
                project: 'my-project',
                image: 'my-image',
                tags: ['${version}', 'latest'],
                username: process.env.DOCKER_USERNAME,
                password: process.env.DOCKER_PASSWORD,
            },
        ],
    ],
};
```

## Configuration

| Option   | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| registry | The Docker registry to push images to.                             |
| project  | The project name in the Docker registry.                           |
| image    | The Docker image name.                                             |
| tags     | An array of tags to apply to the Docker image.                     |
| username | (Optional) The username for Docker registry authentication.        |
| password | (Optional) The password for Docker registry authentication.        |
| insecure | (Optional) Set to `true` to skip Docker registry TLS verification. |

## Contributing

We welcome contributions to semantic-release-kaniko!

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the contributors and the open-source community for their invaluable support and contributions.

For more information, visit the [official repository](https://github.com/brendangeck/semantic-release-kaniko).
