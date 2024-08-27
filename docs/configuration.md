# Configuration

## Supported Kaniko Flags

This section lists the flags supported by the `@bpgeck/semantic-release-kaniko` plugin. All are directly from [Kaniko](https://github.com/GoogleContainerTools/kaniko?tab=readme-ov-file#additional-flags)

### buildArg

This flag allows you to pass in ARG values at build time. Use an array for multiple values.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "buildArg": ["MY_VAR='value with spaces'", "MY_VAR_2=ValueWithNoSpaces"]
        }
    ]
}
```

**Environment variable:**

```shell
BUILD_ARG="MY_VAR='value with spaces',MY_VAR_2=ValueWithNoSpaces"
```

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
CACHE="true"
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
CACHE_COPY_LAYERS="true"
```

### cacheDir

This flag specifies a local directory to use as a cache. The default value is "/cache".

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
CACHE_DIR="/custom/cache/directory"
```

### cacheRepo

This flag specifies a repository to use as a cache. If not provided, one will be inferred from the destination. When prefixed with 'oci:', the repository will be written in OCI image layout format at the path provided.

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
CACHE_REPO="oci:/path/to/cache/repo"
```

### cacheRunLayers

This flag enables caching of run layers. It is set to true by default.

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
CACHE_RUN_LAYERS="true"
```

### cacheTTL

This flag sets the cache timeout. It requires a value and unit of duration, for example, "6h". The default is two weeks (336h0m0s).

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
CACHE_TTL="24h"
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
CLEANUP="true"
```

### compressedCaching

This flag enables compression of cached layers. It decreases build time but increases memory usage. It is set to true by default.

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
COMPRESSED_CACHING="true"
```

### compression

This flag specifies the compression algorithm to use. Options are "gzip" or "zstd".

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
COMPRESSION="zstd"
```

### compressionLevel

This flag sets the compression level. The default value is -1.

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
COMPRESSION_LEVEL="5"
```

### context

This flag specifies the path to the dockerfile build context. The default value is "/workspace/".

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
CONTEXT="/custom/build/context"
```

### contextSubPath

This flag specifies a sub path within the given context.

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
CONTEXT_SUB_PATH="subdir"
```

### customPlatform

This flag specifies the build platform if different from the current host.

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
CUSTOM_PLATFORM="linux/arm64"
```

### destination

This flag specifies the registry the final image should be pushed to. Use an array for multiple destinations.

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
DESTINATION="registry.example.com/my-project/my-image:${version},registry.example.com/my-project/my-image:latest"
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
DIGEST_FILE="/path/to/digest/file"
```

### dockerfile

This flag specifies the path to the dockerfile to be built. The default value is "Dockerfile".

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
DOCKERFILE="custom.Dockerfile"
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
FORCE="true"
```

### forceBuildMetadata

This flag forces adding metadata layers to the build image.

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
FORCE_BUILD_METADATA="true"
```

### git

This flag specifies git options for cloning if the build context is a git repository.

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
GIT="branch=main,single-branch=true,recurse-submodules=true"
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
IGNORE_PATH="/path/to/ignore1,/path/to/ignore2"
```

### ignoreVarRun

This flag ignores the /var/run directory when taking an image snapshot. Set it to false to preserve /var/run/ in the destination image. The default value is true.

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
IGNORE_VAR_RUN="

false"
```

### imageDownloadRetry

This flag specifies the number of retries for downloading the remote image.

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
IMAGE_DOWNLOAD_RETRY="3"
```

### imageFsExtractRetry

This flag specifies the number of retries for image filesystem extraction.

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
IMAGE_FS_EXTRACT_RETRY="3"
```

### imageNameTagWithDigestFile

This flag specifies a file to save the image name with image tag and digest of the built image to.

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
IMAGE_NAME_TAG_WITH_DIGEST_FILE="/path/to/image/info/file"
```

### imageNameWithDigestFile

This flag specifies a file to save the image name with digest of the built image to.

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
IMAGE_NAME_WITH_DIGEST_FILE="/path/to/image/digest/file"
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
INSECURE="true"
```

### insecurePull

This flag enables pulling from an insecure registry using plain HTTP.

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
INSECURE_PULL="true"
```

### insecureRegistry

This flag specifies insecure registries using plain HTTP to push and pull. Use an array for multiple registries.

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
INSECURE_REGISTRY="registry1.example.com,registry2.example.com"
```

### kanikoDir

This flag specifies the path to the kaniko directory. It takes precedence over the KANIKO_DIR environment variable. The default value is "/kaniko".

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
KANIKO_DIR="/custom/kaniko/dir"
```

### label

This flag sets metadata for an image. Use an array for multiple labels.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "label": ["maintainer=John Doe", "version=1.0.0"]
        }
    ]
}
```

**Environment variable:**

```shell
LABEL="maintainer=John Doe,version=1.0.0"
```

### logFormat

This flag specifies the log format. Options are "text", "color", or "json". The default value is "color".

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
LOG_FORMAT="json"
```

### logTimestamp

This flag enables timestamp in log output.

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
LOG_TIMESTAMP="true"
```

### noPush

This flag disables pushing the image to the registry.

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
NO_PUSH="true"
```

### noPushCache

This flag disables pushing the cache layers to the registry.

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
NO_PUSH_CACHE="true"
```

### ociLayoutPath

This flag specifies the path to save the OCI image layout of the built image.

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
OCI_LAYOUT_PATH="/path/to/oci/layout"
```

### pushIgnoreImmutableTagErrors

This flag, when set to true, ignores known tag immutability errors and finishes the push operation with success.

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
PUSH_IGNORE_IMMUTABLE_TAG_ERRORS="true"
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
PUSH_RETRY="3"
```

### registryCertificate

This flag specifies the certificate to use for TLS communication with the given registry. Expected format is 'my.registry.url=/path/to/the/server/certificate'.

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
REGISTRY_CERTIFICATE="my.registry.url=/path/to/the/server/certificate"
```

### registryClientCert

This flag specifies the client certificate to use for mutual TLS (mTLS) communication with the given registry. Expected format is 'my.registry.url=/path/to/client/cert,/path/to/client/key'.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "registryClientCert": {
                "my.registry.url": "/path/to/client/cert,/path/to/client/key"
            }
        }
    ]
}
```

**Environment variable:**

```shell
REGISTRY_CLIENT_CERT="my.registry.url=/path/to/client/cert,/path/to/client/key"
```

### registryMap

This flag specifies a registry map of mirror to use as pull-through cache instead. Expected format is 'original.registry=new.registry;other-original.registry=other-remap.registry'.

**.releaserc:**

```json
{
    "plugins": [
        "@bpgeck/semantic-release-kaniko",
        {
            "registryMap": {
                "original.registry": "new.registry",
                "other-original.registry": "other-remap.registry"
            }
        }
    ]
}
```

**Environment variable:**

```shell
REGISTRY_MAP="original.registry=new.registry;other-original.registry=other-remap.registry"
```

### registryMirror

This flag specifies a registry mirror to use as pull-through cache instead of docker.io. Use an array for multiple mirrors.

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
REGISTRY_MIRROR="mirror1.example.com,mirror2.example.com"
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
REPRODUCIBLE="true"
```

### singleSnapshot

This flag takes a single snapshot at the end of the build.

\*\*

.releaserc:\*\*

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
SINGLE_SNAPSHOT="true"
```

### skipDefaultRegistryFallback

This flag, when set, prevents fallback to the default registry if an image is not found on any mirrors (defined with registry-mirror). If registry-mirror is not defined, this flag is ignored.

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
SKIP_DEFAULT_REGISTRY_FALLBACK="true"
```

### skipPushPermissionCheck

This flag skips the check of the push permission.

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
SKIP_PUSH_PERMISSION_CHECK="true"
```

### skipTlsVerify

This flag enables pushing to an insecure registry ignoring TLS verify.

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
SKIP_TLS_VERIFY="true"
```

### skipTlsVerifyPull

This flag enables pulling from an insecure registry ignoring TLS verify.

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
SKIP_TLS_VERIFY_PULL="true"
```

### skipTlsVerifyRegistry

This flag specifies insecure registries ignoring TLS verify to push and pull. Use an array for multiple registries.

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
SKIP_TLS_VERIFY_REGISTRY="registry1.example.com,registry2.example.com"
```

### skipUnusedStages

This flag, when set to true, builds only used stages. Otherwise, it builds all stages by default, even the unnecessary ones until it reaches the target stage / end of Dockerfile.

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
SKIP_UNUSED_STAGES="true"
```

### snapshotMode

This flag changes the file attributes inspected during snapshotting. The default value is "full".

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
SNAPSHOT_MODE="time"
```

### tarPath

This flag specifies the path to save the image as a tarball instead of pushing.

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
TAR_PATH="/path/to/save/image.tar"
```

### target

This flag sets the target build stage to build.

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
TARGET="production"
```

### useNewRun

This flag enables the use of the experimental run implementation for detecting changes without requiring file system snapshots.

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
USE_NEW_RUN="true"
```

### verbosity

This flag sets the log level. Options are "trace", "debug", "info", "warn", "error", "fatal", "panic". The default value is "info".

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
VERBOSITY="debug"
```
