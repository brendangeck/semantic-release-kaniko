import { verifyConditions } from '../../lib/verifyConditions.js';
import assert from 'assert';
import SemanticReleaseError from '@semantic-release/error';

const validConfig = {
    project: 'test-project',
    image: 'test-image',
    tags: ['latest', 'v1.0.0'],
    registry: 'mock-registry:5000',
    dockerfile: 'Dockerfile',
};

const context = {
    logger: console,
};

describe('Verify Conditions', function () {
    this.timeout(20000);

    it('should fail if Dockerfile is missing', async () => {
        const invalidConfig = { ...validConfig, dockerfile: 'NonExistentDockerfile' };

        try {
            await verifyConditions(invalidConfig, context);
            assert.fail('Expected an error due to missing Dockerfile');
        } catch (error) {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EDOCKERFILENOTFOUND');
        }
    });

    it('should fail if registry is missing in configuration', async () => {
        const invalidConfig = { ...validConfig, registry: null };

        try {
            await verifyConditions(invalidConfig, context);
            assert.fail('Expected an error due to missing registry');
        } catch (error) {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGREGISTRY');
        }
    });

    it('should fail if project is missing in configuration', async () => {
        const invalidConfig = { ...validConfig, project: null };

        try {
            await verifyConditions(invalidConfig, context);
            assert.fail('Expected an error due to missing project name');
        } catch (error) {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGPROJECT');
        }
    });

    it('should fail if image is missing in configuration', async () => {
        const invalidConfig = { ...validConfig, image: null };

        try {
            await verifyConditions(invalidConfig, context);
            assert.fail('Expected an error due to missing image name');
        } catch (error) {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGIMAGE');
        }
    });

    it('should fail if tags are missing in configuration', async () => {
        const invalidConfig = { ...validConfig, tags: [] };

        try {
            await verifyConditions(invalidConfig, context);
            assert.fail('Expected an error due to missing tags');
        } catch (error) {
            assert(error instanceof SemanticReleaseError);
            assert.strictEqual(error.code, 'EMISSINGTAGS');
        }
    });
});
