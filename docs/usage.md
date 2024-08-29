# Usage

## Overview

This guide provides usage examples and configurations for the [`.releaserc` file](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file), demonstrating its use with different formats and Continuous Integration (CI) environments. The `.releaserc` file is used for configuring release settings, including plugins, branches, and other options for the [`semantic-release`](https://semantic-release.gitbook.io/semantic-release) tool, which automates the release process.

## .releaserc

`.releaserc` supports several file formats including JSON, YAML, and JavaScript.

### JSON Example

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
                ],
                "dockerfile": "custom.Dockerfile"
            }
        ]
    ]
}
```

### YAML Example

```yaml
branches:
    - main
plugins:
    - '@semantic-release/commit-analyzer'
    - - '@bpgeck/semantic-release-kaniko'
        - destination:
            - registry.example.com/my-project/my-image:${version}
            - registry.example.com/my-project/my-image:latest
        - dockerfile: custom.Dockerfile
```

### JavaScript Example

```javascript
module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        [
            '@bpgeck/semantic-release-kaniko',
            {
                destination: [
                    'registry.example.com/my-project/my-image:${version}',
                    'registry.example.com/my-project/my-image:latest',
                ],
                dockerfile: 'custom.Dockerfile',
            },
        ],
    ],
};
```

## Environment Variables for Plugin Configuration

In cases where sensitive data or variable configuration is necessary, we support providing config values as env vars. This approach is especially beneficial in CI/CD environments where the configuration should not be hardcoded in the `.releaserc` file.

The environment variable names are derived from the configuration options by converting the option name to uppercase and prefixing with `KANIKO`. For example, the `destination` option would be set with the `KANIKO_DESTINATION` environment variable.

Anything more complex than a simple key/value pair should be represented as JSON. Some examples:

-   `KANIKO_NO_PUSH=true`
-   `KANIKO_DOCKERFILE="custom.Dockerfile"`
-   `KANIKO_DESTINATION='["registry.example.com/my-project/my-image:\${version}","registry.example.com/my-project/my-image:latest"]'`
-   `KANIKO_REGISTRY_CLIENT_CERT='{"my.first.registry.url":{"cert":"/path/to/first/client/cert","key":"/path/to/first/client/key"},"my.second.registry.url":{"cert":"/path/to/second/client/cert","key":"/path/to/second/client/key"}}'`

Full list of configuration options and examples can be found in the [Configuration](./configuration.md) documentation.

### Environment Variables Example

1. Include the `@bpgeck/semantic-release-kaniko` plugin in your `.releaserc` file:

    ```json
    {
        "branches": ["main"],
        "plugins": ["@semantic-release/commit-analyzer", "@bpgeck/semantic-release-kaniko"]
    }
    ```

2. Define the environment variables in your CI configuration. For instance, in a GitHub Actions workflow:

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

                - name: Install dependencies
                  run: npm i

                - name: Release
                  run: npx semantic-release
                  env:
                      KANIKO_DESTINATION: '["registry.example.com/my-project/my-image:\${version}","registry.example.com/my-project/my-image:latest"]'
                      KANIKO_DOCKERFILE: custom.Dockerfile
    ```

## Example Workflows

Here are some examples showing how to integrate `semantic-release` and the `@bpgeck/semantic-release-kaniko` plugin into various CI/CD pipelines.

### GitHub Actions Workflow Example

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

            - name: Release
              run: npx semantic-release
```

### GitLab CI Example

```yaml
stages:
    - release

release:
    stage: release
    image: ghcr.io/brendangeck/semantic-release-kaniko:latest
    script:
        - npm ci
        - npx semantic-release
    rules:
        - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

### CircleCI Example

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

workflows:
    version: 2
    release:
        jobs:
            - release:
                  filters:
                      branches:
                          only: main
```

## Private Registry Authorization

You can use environment variables to pass credentials to Kaniko. These environment variables are typically set in your CI/CD environment for security. The two main environment variables used are:

-   `DOCKER_REGISTRY`: The URL of the Docker registry
-   `DOCKER_USERNAME`: The username for the Docker registry.
-   `DOCKER_PASSWORD`: The password or token for the Docker registry.

To configure your GitHub Actions workflow to push images to a private registry, add the `DOCKER_USERNAME` and `DOCKER_PASSWORD` as secrets in your GitHub repository settings. Then, use them in your workflow file:

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

            - name: Release
              run: npx semantic-release
              env:
                  DOCKER_REGISTRY: registry.example.com
                  DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
                  DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
```

## Advanced Configuration

For more detailed information on all available configuration flags, refer to the [Configuration](configuration.md) doc.
