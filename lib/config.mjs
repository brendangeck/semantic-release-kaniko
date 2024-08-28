import { parseArrayOrString, toBoolean } from './utils.mjs';

function parseConfig(pluginConfig) {
    const config = {};

    const camelToEnvVar = (str) => str.split(/(?=[A-Z])/).join('_').toUpperCase();

    const parseIfDefined = (key, parser) => {
        const value = pluginConfig[key] || process.env[camelToEnvVar(key)];
        if (value !== undefined) {
            config[key] = parser ? parser(value) : value;
        }
    };

    parseIfDefined('buildArg', JSON.parse);
    parseIfDefined('cache', toBoolean);
    parseIfDefined('cacheCopyLayers', toBoolean);
    parseIfDefined('cacheDir');
    parseIfDefined('cacheRepo');
    parseIfDefined('cacheRunLayers', toBoolean);
    parseIfDefined('cacheTTL');
    parseIfDefined('cleanup', toBoolean);
    parseIfDefined('compressedCaching', toBoolean);
    parseIfDefined('compression');
    parseIfDefined('compressionLevel', parseInt);
    parseIfDefined('context');
    parseIfDefined('contextSubPath');
    parseIfDefined('customPlatform');
    parseIfDefined('destination', parseArrayOrString);
    parseIfDefined('digestFile');
    parseIfDefined('dockerfile');
    parseIfDefined('force', toBoolean);
    parseIfDefined('forceBuildMetadata', toBoolean);
    parseIfDefined('git', JSON.parse);
    parseIfDefined('ignorePath', parseArrayOrString);
    parseIfDefined('ignoreVarRun', toBoolean);
    parseIfDefined('imageDownloadRetry', parseInt);
    parseIfDefined('imageFsExtractRetry', parseInt);
    parseIfDefined('imageNameTagWithDigestFile');
    parseIfDefined('imageNameWithDigestFile');
    parseIfDefined('insecure', toBoolean);
    parseIfDefined('insecurePull', toBoolean);
    parseIfDefined('insecureRegistry', parseArrayOrString);
    parseIfDefined('kanikoDir');
    parseIfDefined('label', JSON.parse);
    parseIfDefined('logFormat');
    parseIfDefined('logTimestamp', toBoolean);
    parseIfDefined('noPush', toBoolean);
    parseIfDefined('noPushCache', toBoolean);
    parseIfDefined('ociLayoutPath');
    parseIfDefined('pushIgnoreImmutableTagErrors', toBoolean);
    parseIfDefined('pushRetry', parseInt);
    parseIfDefined('registryCertificate', JSON.parse);
    parseIfDefined('registryClientCert', JSON.parse);
    parseIfDefined('registryMap', JSON.parse);
    parseIfDefined('registryMirror', parseArrayOrString);
    parseIfDefined('reproducible', toBoolean);
    parseIfDefined('singleSnapshot', toBoolean);
    parseIfDefined('skipDefaultRegistryFallback', toBoolean);
    parseIfDefined('skipPushPermissionCheck', toBoolean);
    parseIfDefined('skipTlsVerify', toBoolean);
    parseIfDefined('skipTlsVerifyPull', toBoolean);
    parseIfDefined('skipTlsVerifyRegistry', parseArrayOrString);
    parseIfDefined('skipUnusedStages', toBoolean);
    parseIfDefined('snapshotMode');
    parseIfDefined('tarPath');
    parseIfDefined('target');
    parseIfDefined('useNewRun', toBoolean);
    parseIfDefined('verbosity');

    return config;
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

export { parseConfig, toKanikoArgs };
