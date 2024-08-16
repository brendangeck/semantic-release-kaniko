import { verifyConditions } from '../../lib/verifyConditions.mjs';
import assert from 'assert';
import SemanticReleaseError from '@semantic-release/error';

const validConfig = {
    image: 'test-project/test-image',
    tags: ['latest', '${version}'],
    registry: 'mock-registry:5000',
    dockerfile: 'Dockerfile',
};

const context = {
    logger: console,
};

describe('Verify Conditions', function () {
    this.timeout(20000);

    let originalEnv;

    beforeEach(() => {
        originalEnv = { ...process.env };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should fail if Dockerfile is missing', async () => {
        const invalidConfig = { ...validConfig, dockerfile: 'NonExistentDockerfile' };
        await assert.rejects(verifyConditions(invalidConfig, context), error => {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EDOCKERFILENOTFOUND');
            return true;
        });
    });

    it('should fail if registry is missing in configuration', async () => {
        const invalidConfig = { ...validConfig, registry: null };
        await assert.rejects(verifyConditions(invalidConfig, context), error => {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGREGISTRY');
            return true;
        });
    });

    it('should fail if image is missing in configuration', async () => {
        const invalidConfig = { ...validConfig, image: null };
        await assert.rejects(verifyConditions(invalidConfig, context), error => {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGIMAGE');
            return true;
        });
    });

    it('should fail if tags are missing in configuration', async () => {
        const invalidConfig = { ...validConfig, tags: [] };
        await assert.rejects(verifyConditions(invalidConfig, context), error => {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGTAGS');
            return true;
        });
    });

    it('should use environment variables when config is not provided', async () => {
        process.env.IMAGE = 'env-test-image';
        process.env.TAGS = 'latest,${version}';
        process.env.REGISTRY = 'env-registry:5000';
        process.env.DOCKERFILE = 'tst/integ/resources/test.Dockerfile';

        const emptyConfig = {};
        await verifyConditions(emptyConfig, { logger: console });
    });
});
