import { publish } from '../../lib/publish.mjs';
import assert from 'assert';

// Merging prepare and publish into the same test suite to guarantee they run in order
describe('Comprehensive Test with All Arguments', function () {
    this.timeout(600000); // 10 minute timeout

    let context;
    let pluginConfig;

    beforeEach(() => {
        // Mock context
        context = {
            logger: console,
            nextRelease: {
                version: '1.0.0',
            },
        };

        // Comprehensive configuration with all possible flags
        pluginConfig = {
            buildArg: { TEST_ARG: 'TEST' },
            cache: true,
            cacheDir: '/path/to/cache',
            cacheRepo: 'mock-cache-repo',
            cacheRunLayers: true,
            cacheTTL: '24h',
            cleanup: true,
            compressedCaching: true,
            compression: 'gzip',
            compressionLevel: 6,
            context: '/',
            contextSubPath: 'app',
            customPlatform: 'linux/amd64',
            destination: [
                'mock-registry:5000/my-project/my-image:${version}',
                'mock-registry:5000/my-project/my-image:latest',
            ],
            digestFile: '/path/to/digest/file',
            dockerfile: 'tst/integ/resources/test.Dockerfile',
            force: true,
            forceBuildMetadata: true,
            git: { branch: 'main', commit: 'abc123' },
            ignorePath: ['/path/to/ignore'],
            ignoreVarRun: true,
            imageDownloadRetry: 3,
            imageFsExtractRetry: 3,
            imageNameTagWithDigestFile: '/path/to/image-name-tag-with-digest-file',
            imageNameWithDigestFile: '/path/to/image-name-with-digest-file',
            insecure: true,
            insecurePull: true,
            insecureRegistry: ['mock-registry:5000'],
            kanikoDir: '/kaniko/executor',
            label: { maintainer: 'test-user' },
            logFormat: 'json',
            logTimestamp: true,
            noPush: false,
            noPushCache: false,
            ociLayoutPath: '/output/ociLayoutPath',
            pushIgnoreImmutableTagErrors: true,
            pushRetry: 3,
            registryCertificate: { cert: '/path/to/cert', key: '/path/to/key' },
            registryClientCert: { cert: '/path/to/client/cert', key: '/path/to/client/key' },
            registryMap: [{ 'original-registry': 'remapped-registry' }],
            registryMirror: ['mock-registry-mirror:5000'],
            reproducible: true,
            singleSnapshot: true,
            skipDefaultRegistryFallback: true,
            skipPushPermissionCheck: true,
            skipTlsVerify: true,
            skipTlsVerifyPull: true,
            skipTlsVerifyRegistry: ['mock-registry:5000'],
            skipUnusedStages: true,
            snapshotMode: 'full',
            tarPath: '/path/to/tar',
            target: 'final',
            useNewRun: true,
            verbosity: 'info',
            username: 'test-user',
            password: 'test-password',
        };
    });

    it('should execute publish with all configuration parameters successfully', async () => {
        try {
            await publish(pluginConfig, context);
            // Assume no error means success
        } catch (error) {
            assert.fail(`Failed to publish with all arguments: ${error.stack}`);
        }
    });
});
