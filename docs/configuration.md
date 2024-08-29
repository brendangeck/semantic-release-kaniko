# Configuration

## Supported Kaniko Flags

This section lists the flags supported by the `@bpgeck/semantic-release-kaniko` plugin. All are directly from [Kaniko](https://github.com/GoogleContainerTools/kaniko?tab=readme-ov-file#additional-flags).

We allow using either `.releaserc` or environment variables to configure the plugin. If both are set, the configuration in `.releaserc` is preferred. Environment variables should be represented as JSON if they contain anything more than a single key-value pair.

### buildArg

This flag allows you to pass in build arguments as key-value pairs. Use an array of objects for multiple values.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "buildArg": [
                {"name": "MY_VAR", "value": "value with spaces"},
                {"name": "MY_VAR_2", "value": "ValueWithNoSpaces"}
            ]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_BUILD_ARG='[{"name":"MY_VAR","value":"value with spaces"},{"name":"MY_VAR_2","value":"ValueWithNoSpaces"}]'
```

Note that passing values that contain spaces is not natively supported - you need to ensure that the IFS is set to null before your executor command. You can set this by setting the `IFS` env var like so: `IFS=''`

### cache

This flag enables the use of cache when building the image.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cache": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CACHE=true
```

### cacheCopyLayers

This flag enables caching of copy layers.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cacheCopyLayers": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CACHE_COPY_LAYERS=true
```

### cacheDir

This flag specifies a local directory to use as a cache.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cacheDir": "/custom/cache/directory"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CACHE_DIR="/custom/cache/directory"
```

### cacheRepo

This flag specifies a repository to use as a cache.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cacheRepo": "oci:/path/to/cache/repo"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CACHE_REPO="oci:/path/to/cache/repo"
```

### cacheRunLayers

This flag enables caching of run layers.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cacheRunLayers": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CACHE_RUN_LAYERS=true
```

### cacheTTL

This flag sets the cache timeout with a value and unit of duration.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cacheTTL": "24h"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CACHE_TTL="24h"
```

### cleanup

This flag enables cleaning the filesystem at the end of the build.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "cleanup": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CLEANUP=true
```

### compressedCaching

This flag enables compression of cached layers.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "compressedCaching": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_COMPRESSED_CACHING=true
```

### compression

This flag specifies the compression algorithm to use.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "compression": "zstd"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_COMPRESSION="zstd"
```

### compressionLevel

This flag sets the compression level.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "compressionLevel": 5
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_COMPRESSION_LEVEL=5
```

### context

This flag specifies the path to the dockerfile build context.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "context": "/custom/build/context"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CONTEXT="/custom/build/context"
```

### contextSubPath

This flag specifies a subpath within the given context.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "contextSubPath": "subdir"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CONTEXT_SUB_PATH="subdir"
```

### customPlatform

This flag specifies the build platform.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "customPlatform": "linux/arm64"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_CUSTOM_PLATFORM="linux/arm64"
```

### destination

This flag specifies the registry the final image should be pushed to.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "destination": [
                "registry.example.com/my-project/my-image:${version}",
                "registry.example.com/my-project/my-image:latest"
            ]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_DESTINATION='["registry.example.com/my-project/my-image:\${version}","registry.example.com/my-project/my-image:latest"]'
```

### digestFile

This flag specifies a file to save the digest of the built image to.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "digestFile": "/path/to/digest/file"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_DIGEST_FILE="/path/to/digest/file"
```

### dockerfile

This flag specifies the path to the dockerfile to be built.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "dockerfile": "custom.Dockerfile"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_DOCKERFILE="custom.Dockerfile"
```

### force

This flag forces building outside of a container.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "force": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_FORCE=true
```

### registryClientCert

This flag specifies client certificates for mutual TLS communication with registries.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "registryClientCert": {
                "my.first.registry.url": {
                    "cert": "/path/to/first/client/cert",
                    "key": "/path/to/first/client/key"
                },
                "my.second.registry.url": {
                    "cert": "/path/to/second/client/cert",
                    "key": "/path/to/second/client/key"
                }
            }
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_REGISTRY_CLIENT_CERT='{"my.first.registry.url":{"cert":"/path/to/first/client/cert","key":"/path/to/first/client/key"},"my.second.registry.url":{"cert":"/path/to/second/client/cert","key":"/path/to/second/client/key"}}'
```

Below is how you can add the `--registry-map` flag to your configuration file documentation, including both the `.releaserc` configuration and environment variable representation:

---

### registryMap

This flag allows you to remap registry references. It is useful for scenarios like air-gapped environments, where you might want to redirect registry requests to local mirrors or specific internal registries. You can specify multiple remapped registries for a single original registry. Kaniko will try each remapped registry in order and fall back on the original registry if none of the mirrors are available.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "registryMap": [
                {
                    "original": "index.docker.io",
                    "remapped": ["docker-io.mirrors.corp.net", "mirror.gcr.io"]
                },
                {
                    "original": "gcr.io",
                    "remapped": ["127.0.0.1"]
                },
                {
                    "original": "quay.io",
                    "remapped": ["192.168.0.1:5000"]
                },
                {
                    "original": "docker.io",
                    "remapped": ["harbor.private.io/theproject"]
                }
            ]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_REGISTRY_MAP='[
    {"original":"index.docker.io","remapped":["docker-io.mirrors.corp.net","mirror.gcr.io"]},
    {"original":"gcr.io","remapped":["127.0.0.1"]},
    {"original":"quay.io","remapped":["192.168.0.1:5000"]},
    {"original":"docker.io","remapped":["harbor.private.io/theproject"]}
]'
```

### forceBuildMetadata

This flag forces the addition of metadata layers to the build image.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "forceBuildMetadata": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_FORCE_BUILD_METADATA=true
```

### git

This flag specifies git options for cloning when the build context is a git repository.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "git": {
                "branch": "main",
                "singleBranch": true,
                "recurseSubmodules": true
            }
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_GIT='{"branch":"main","singleBranch":true,"recurseSubmodules":true}'
```

### ignorePath

This flag specifies paths to ignore when taking a snapshot. Use an array for multiple paths.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "ignorePath": ["/path/to/ignore1", "/path/to/ignore2"]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_IGNORE_PATH='["/path/to/ignore1","/path/to/ignore2"]'
```

### ignoreVarRun

This flag controls whether to ignore the `/var/run` directory when taking an image snapshot.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "ignoreVarRun": false
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_IGNORE_VAR_RUN=false
```

### imageDownloadRetry

This flag specifies the number of retries for downloading a remote image.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "imageDownloadRetry": 3
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_IMAGE_DOWNLOAD_RETRY=3
```

### imageFsExtractRetry

This flag sets the number of retries for extracting the image filesystem.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "imageFsExtractRetry": 3
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_IMAGE_FS_EXTRACT_RETRY=3
```

### imageNameTagWithDigestFile

This flag specifies a file to save the image name with tag and digest information.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "imageNameTagWithDigestFile": "/path/to/image/info/file"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_IMAGE_NAME_TAG_WITH_DIGEST_FILE="/path/to/image/info/file"
```

### imageNameWithDigestFile

This flag specifies a file to save the image name with digest information.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "imageNameWithDigestFile": "/path/to/image/digest/file"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_IMAGE_NAME_WITH_DIGEST_FILE="/path/to/image/digest/file"
```

### insecure

This flag enables pushing to an insecure registry using plain HTTP.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "insecure": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_INSECURE=true
```

### insecurePull

This flag allows pulling from an insecure registry using plain HTTP.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "insecurePull": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_INSECURE_PULL=true
```

### insecureRegistry

This flag specifies a list of insecure registries using plain HTTP for both push and pull operations.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "insecureRegistry": ["registry1.example.com", "registry2.example.com"]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_INSECURE_REGISTRY='["registry1.example.com","registry2.example.com"]'
```

### kanikoDir

This flag specifies the path to the Kaniko directory. This setting overrides the `KANIKO_DIR` environment variable.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "kanikoDir": "/custom/kaniko/dir"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_KANIKO_DIR="/custom/kaniko/dir"
```

Notice how we have `KANIKO` twice here. The first prefix is how we namespace env vars the plugin uses. The second prefix is for the kaniko variable name itself (which is `--kaniko-dir`).

### label

This flag sets metadata labels for an image. Use an array of objects for multiple labels.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "label": [
                {"name": "maintainer", "value": "John Doe"},
                {"name": "version", "value": "1.0.0"}
            ]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_LABEL='[{"name":"maintainer","value":"John Doe"},{"name":"version","value":"1.0.0"}]'
```

### logFormat

This flag specifies the format of the logs. Options are `"text"`, `"color"`, or `"json"`.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "logFormat": "json"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_LOG_FORMAT="json"
```

### logTimestamp

This flag enables timestamps in the log output.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "logTimestamp": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_LOG_TIMESTAMP=true
```

### noPush

This flag disables pushing the built image to the registry.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "noPush": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_NO_PUSH=true
```

### noPushCache

This flag disables pushing cache layers to the registry.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "noPushCache": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_NO_PUSH_CACHE=true
```

### ociLayoutPath

This flag specifies the path to save the OCI image layout.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "ociLayoutPath": "/path/to/oci/layout"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_OCI_LAYOUT_PATH="/path/to/oci/layout"
```

### pushIgnoreImmutableTagErrors

This flag, when set to `true`, ignores tag immutability errors during push operations.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "pushIgnoreImmutableTagErrors": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_PUSH_IGNORE_IMMUTABLE_TAG_ERRORS=true
```

### pushRetry

This flag specifies the number of retries for the push operation.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "pushRetry": 3
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_PUSH_RETRY=3
```

### registryCertificate

This flag specifies the certificate for TLS communication with a given registry.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "registryCertificate": {
                "my.registry.url": "/path/to/the/server/certificate"
            }
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_REGISTRY_CERTIFICATE='{"my.registry.url":"/path/to/the/server/certificate"}'
```

### registryMirror

This flag specifies a list of registry mirrors for pull-through caching instead of using docker.io directly.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "registryMirror": ["mirror1.example.com", "mirror2.example.com"]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_REGISTRY_MIRROR='["mirror1.example.com","mirror2.example.com"]'
```

### reproducible

This flag strips timestamps out of the image to make it reproducible.

**.releaserc:**

```json


{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "reproducible": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_REPRODUCIBLE=true
```

### singleSnapshot

This flag takes a single snapshot at the end of the build process.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "singleSnapshot": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SINGLE_SNAPSHOT=true
```

### skipDefaultRegistryFallback

This flag prevents fallback to the default registry if an image is not found on defined mirrors.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "skipDefaultRegistryFallback": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SKIP_DEFAULT_REGISTRY_FALLBACK=true
```

### skipPushPermissionCheck

This flag skips checking push permissions.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "skipPushPermissionCheck": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SKIP_PUSH_PERMISSION_CHECK=true
```

### skipTlsVerify

This flag enables pushing to an insecure registry without TLS verification.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "skipTlsVerify": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SKIP_TLS_VERIFY=true
```

### skipTlsVerifyPull

This flag enables pulling from an insecure registry without TLS verification.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "skipTlsVerifyPull": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SKIP_TLS_VERIFY_PULL=true
```

### skipTlsVerifyRegistry

This flag specifies registries to ignore TLS verification for push and pull operations.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "skipTlsVerifyRegistry": ["registry1.example.com", "registry2.example.com"]
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SKIP_TLS_VERIFY_REGISTRY='["registry1.example.com","registry2.example.com"]'
```

### skipUnusedStages

This flag builds only the used stages, ignoring unnecessary ones.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "skipUnusedStages": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SKIP_UNUSED_STAGES=true
```

### snapshotMode

This flag changes the file attributes inspected during snapshotting.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "snapshotMode": "time"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_SNAPSHOT_MODE="time"
```

### tarPath

This flag specifies the path to save the image as a tarball instead of pushing it.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "tarPath": "/path/to/save/image.tar"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_TAR_PATH="/path/to/save/image.tar"
```

### target

This flag sets the target build stage.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "target": "production"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_TARGET="production"
```

### useNewRun

This flag enables the use of an experimental run implementation for detecting changes.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "useNewRun": true
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_USE_NEW_RUN=true
```

### verbosity

This flag sets the log level for output. Options include `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"fatal"`, `"panic"`.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "verbosity": "debug"
        }
    ]
}
```

**Environment variable:**

```shell
KANIKO_VERBOSITY="debug"
```
