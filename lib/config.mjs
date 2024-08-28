import { parseArrayOrString, toBoolean } from './utils.mjs';

function getConfig(pluginConfig) {
    return {
        buildArg: JSON.parse(pluginConfig.buildArg, process.env.BUILD_ARG),
        cache: toBoolean(pluginConfig.cache || process.env.CACHE),
        cacheCopyLayers: toBoolean(pluginConfig.cacheCopyLayers || process.env.CACHE_COPY_LAYERS),
        cacheDir: pluginConfig.cacheDir || process.env.CACHE_DIR,
        cacheRepo: pluginConfig.cacheRepo || process.env.CACHE_REPO,
        cacheRunLayers: toBoolean(pluginConfig.cacheRunLayers || process.env.CACHE_RUN_LAYERS),
        cacheTTL: pluginConfig.cacheTTL || process.env.CACHE_TTL,
        cleanup: toBoolean(pluginConfig.cleanup || process.env.CLEANUP),
        compressedCaching: toBoolean(
            pluginConfig.compressedCaching || process.env.COMPRESSED_CACHING
        ),
        compression: pluginConfig.compression || process.env.COMPRESSION,
        compressionLevel: parseInt(pluginConfig.compressionLevel || process.env.COMPRESSION_LEVEL),
        context: pluginConfig.context || process.env.CONTEXT,
        contextSubPath: pluginConfig.contextSubPath || process.env.CONTEXT_SUB_PATH,
        customPlatform: pluginConfig.customPlatform || process.env.CUSTOM_PLATFORM,
        destination: parseArrayOrString(pluginConfig.destination, process.env.DESTINATION),
        digestFile: pluginConfig.digestFile || process.env.DIGEST_FILE,
        dockerfile: pluginConfig.dockerfile || process.env.DOCKERFILE,
        force: toBoolean(pluginConfig.force || process.env.FORCE),
        forceBuildMetadata: toBoolean(
            pluginConfig.forceBuildMetadata || process.env.FORCE_BUILD_METADATA
        ),
        git: JSON.parse(pluginConfig.git, process.env.GIT),
        ignorePath: parseArrayOrString(pluginConfig.ignorePath, process.env.IGNORE_PATH),
        ignoreVarRun: toBoolean(pluginConfig.ignoreVarRun || process.env.IGNORE_VAR_RUN),
        imageDownloadRetry: parseInt(
            pluginConfig.imageDownloadRetry || process.env.IMAGE_DOWNLOAD_RETRY
        ),
        imageFsExtractRetry: parseInt(
            pluginConfig.imageFsExtractRetry || process.env.IMAGE_FS_EXTRACT_RETRY
        ),
        imageNameTagWithDigestFile:
            pluginConfig.imageNameTagWithDigestFile || process.env.IMAGE_NAME_TAG_WITH_DIGEST_FILE,
        imageNameWithDigestFile:
            pluginConfig.imageNameWithDigestFile || process.env.IMAGE_NAME_WITH_DIGEST_FILE,
        insecure: toBoolean(pluginConfig.insecure || process.env.INSECURE),
        insecurePull: toBoolean(pluginConfig.insecurePull || process.env.INSECURE_PULL),
        insecureRegistry: parseArrayOrString(
            pluginConfig.insecureRegistry,
            process.env.INSECURE_REGISTRY
        ),
        kanikoDir: pluginConfig.kanikoDir || process.env.KANIKO_DIR,
        label: JSON.parse(pluginConfig.label, process.env.LABEL),
        logFormat: pluginConfig.logFormat || process.env.LOG_FORMAT,
        logTimestamp: toBoolean(pluginConfig.logTimestamp || process.env.LOG_TIMESTAMP),
        noPush: toBoolean(pluginConfig.noPush || process.env.NO_PUSH),
        noPushCache: toBoolean(pluginConfig.noPushCache || process.env.NO_PUSH_CACHE),
        ociLayoutPath: pluginConfig.ociLayoutPath || process.env.OCI_LAYOUT_PATH,
        pushIgnoreImmutableTagErrors: toBoolean(
            pluginConfig.pushIgnoreImmutableTagErrors ||
                process.env.PUSH_IGNORE_IMMUTABLE_TAG_ERRORS
        ),
        pushRetry: parseInt(pluginConfig.pushRetry || process.env.PUSH_RETRY),
        registryCertificate: JSON.parse(
            pluginConfig.registryCertificate,
            process.env.REGISTRY_CERTIFICATE
        ),
        registryClientCert: JSON.parse(
            pluginConfig.registryClientCert,
            process.env.REGISTRY_CLIENT_CERT
        ),
        registryMap: JSON.parse(pluginConfig.registryMap, process.env.KANIKO_REGISTRY_MAP),
        registryMirror: parseArrayOrString(
            pluginConfig.registryMirror,
            process.env.REGISTRY_MIRROR
        ),
        reproducible: toBoolean(pluginConfig.reproducible || process.env.REPRODUCIBLE),
        singleSnapshot: toBoolean(pluginConfig.singleSnapshot || process.env.SINGLE_SNAPSHOT),
        skipDefaultRegistryFallback: toBoolean(
            pluginConfig.skipDefaultRegistryFallback || process.env.SKIP_DEFAULT_REGISTRY_FALLBACK
        ),
        skipPushPermissionCheck: toBoolean(
            pluginConfig.skipPushPermissionCheck || process.env.SKIP_PUSH_PERMISSION_CHECK
        ),
        skipTlsVerify: toBoolean(pluginConfig.skipTlsVerify || process.env.SKIP_TLS_VERIFY),
        skipTlsVerifyPull: toBoolean(
            pluginConfig.skipTlsVerifyPull || process.env.SKIP_TLS_VERIFY_PULL
        ),
        skipTlsVerifyRegistry: parseArrayOrString(
            pluginConfig.skipTlsVerifyRegistry,
            process.env.SKIP_TLS_VERIFY_REGISTRY
        ),
        skipUnusedStages: toBoolean(
            pluginConfig.skipUnusedStages || process.env.SKIP_UNUSED_STAGES
        ),
        snapshotMode: pluginConfig.snapshotMode || process.env.SNAPSHOT_MODE,
        tarPath: pluginConfig.tarPath || process.env.TAR_PATH,
        target: pluginConfig.target || process.env.TARGET,
        useNewRun: toBoolean(pluginConfig.useNewRun || process.env.USE_NEW_RUN),
        verbosity: pluginConfig.verbosity || process.env.VERBOSITY,
    };
}

function toKanikoArgs(config) {
    const args = [];
    if (config.buildArg) Object.entries(config.buildArg).forEach(([key, value]) => args.push('--build-arg', `${key}=${value}`));
    if (config.cache) args.push('--cache=true');
    if (config.cacheCopyLayers) args.push('--cache-copy-layers');
    if (config.cacheDir) args.push('--cache-dir', config.cacheDir);
    if (config.cacheRepo) args.push('--cache-repo', config.cacheRepo);
    if (config.cacheRunLayers) args.push('--cache-run-layers');
    if (config.cacheTTL) args.push('--cache-ttl', config.cacheTTL);
    if (config.cleanup) args.push('--cleanup');
    if (config.compressedCaching !== undefined) args.push('--compressed-caching', config.compressedCaching);
    if (config.compression) args.push('--compression', config.compression);
    if (config.compressionLevel)
        args.push('--compression-level', config.compressionLevel.toString());
    if (config.context) args.push('--context', config.context);
    if (config.contextSubPath) args.push('--context-sub-path', config.contextSubPath);
    if (config.customPlatform) args.push('--customPlatform', config.customPlatform);
    if (config.destination)
        args.push(...config.destination.flatMap(dest => ['--destination', dest]));
    if (config.digestFile) args.push('--digest-file', config.digestFile);
    if (config.dockerfile) args.push('--dockerfile', config.dockerfile);
    if (config.force) args.push('--force');
    if (config.forceBuildMetadata) args.push('--force-build-metadata');
    if (config.git) {
        const gitArgs = Object.entries(config.git)
            .map(([key, value]) => `${key}=${value}`)
            .join(',');
        args.push('--git', gitArgs);
    }
    if (config.ignorePath) config.ignorePath.forEach(path => args.push('--ignore-path', path));
    if (config.ignoreVarRun) args.push('--ignore-var-run');
    if (config.imageDownloadRetry)
        args.push('--image-download-retry', config.imageDownloadRetry.toString());
    if (config.imageFsExtractRetry)
        args.push('--image-fs-extract-retry', config.imageFsExtractRetry.toString());
    if (config.imageNameTagWithDigestFile)
        args.push('--image-name-tag-with-digest-file', config.imageNameTagWithDigestFile);
    if (config.imageNameWithDigestFile)
        args.push('--image-name-with-digest-file', config.imageNameWithDigestFile);
    if (config.insecure) args.push('--insecure');
    if (config.insecurePull) args.push('--insecure-pull');
    if (config.insecureRegistry)
        config.insecureRegistry.forEach(registry => args.push('--insecure-registry', registry));
    if (config.kanikoDir) args.push('--kaniko-dir', config.kanikoDir);
    if (config.label)
        Object.entries(config.label).forEach(([key, value]) =>
            args.push('--label', `${key}=${value}`)
        );
    if (config.logFormat) args.push('--log-format', config.logFormat);
    if (config.logTimestamp) args.push('--log-timestamp');
    if (config.noPush) args.push('--no-push');
    if (config.noPushCache) args.push('--no-push-cache');
    if (config.ociLayoutPath) args.push('--oci-layout-path', config.ociLayoutPath);
    if (config.pushIgnoreImmutableTagErrors) args.push('--push-ignore-immutable-tag-errors');
    if (config.pushRetry) args.push('--push-retry', config.pushRetry.toString());
    if (config.registryCertificate)
        Object.entries(config.registryCertificate).forEach(([key, value]) =>
            args.push('--registry-certificate', `${key}=${value}`)
        );
    if (config.registryClientCert)
        Object.entries(config.registryClientCert).forEach(([key, value]) =>
            args.push('--registry-client-cert', `${key}=${value.cert},${value.key}`)
        );
    if (config.registryMap) {
        const registryMapArgs = config.registryMap
            .map(map => Object.entries(map)
                .map(([original, remapped]) => `${original}=${remapped}`)
                .join(';')
            )
            .join(';');
        args.push('--registry-map', registryMapArgs);
    }
    if (config.registryMirror)
        config.registryMirror.forEach(mirror => args.push('--registry-mirror', mirror));
    if (config.reproducible) args.push('--reproducible');
    if (config.singleSnapshot) args.push('--single-snapshot');
    if (config.skipDefaultRegistryFallback) args.push('--skip-default-registry-fallback');
    if (config.skipPushPermissionCheck) args.push('--skip-push-permission-check');
    if (config.skipTlsVerify) args.push('--skip-tls-verify');
    if (config.skipTlsVerifyPull) args.push('--skip-tls-verify-pull');
    if (config.skipTlsVerifyRegistry)
        config.skipTlsVerifyRegistry.forEach(registry =>
            args.push('--skip-tls-verify-registry', registry)
        );
    if (config.skipUnusedStages) args.push('--skip-unused-stages');
    if (config.snapshotMode) args.push('--snapshot-mode', config.snapshotMode);
    if (config.tarPath) args.push('--tar-path', config.tarPath);
    if (config.target) args.push('--target', config.target);
    if (config.useNewRun) args.push('--use-new-run');
    if (config.verbosity) args.push('--verbosity', config.verbosity);

    return args;
}

export { getConfig, toKanikoArgs };
