import { verifyConditions } from '../../lib/verifyConditions.mjs';
import assert from 'assert';
import SemanticReleaseError from '@semantic-release/error';
import fs from 'fs';
import path from 'path';

describe('Verify Conditions', function () {
    this.timeout(20000);

    let originalEnv;

    beforeEach(() => {
        originalEnv = { ...process.env };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    const executeVerification = async (pluginConfig, expectedError) => {
        if (expectedError) {
            await assert.rejects(
                verifyConditions(pluginConfig, { logger: console }),
                error => error instanceof SemanticReleaseError && error.code === expectedError
            );
        } else {
            await assert.doesNotReject(verifyConditions(pluginConfig, { logger: console }));
        }
    };

    it('should fail when Kaniko is not installed', async () => {
        const kanikoExecutorPath = '/kaniko/executor';
        const invalidKanikoPath = '/kaniko/executor_invalid';

        fs.mkdirSync(path.dirname(invalidKanikoPath), { recursive: true });
        fs.renameSync(kanikoExecutorPath, invalidKanikoPath);

        try {
            await executeVerification({}, 'EMISSINGKANIKO');
        } finally {
            fs.renameSync(invalidKanikoPath, kanikoExecutorPath);
        }
    });

    it('should fail when destination is not set', async () => {
        const pluginConfig = { dockerfile: 'tst/integ/resources/test.Dockerfile' };
        await executeVerification(pluginConfig, 'EMISSINGDESTINATION');
    });

    it('should fail when Dockerfile does not exist', async () => {
        const pluginConfig = {
            destination: ['registry.example.com/my-image:${version}'],
            dockerfile: 'NonExistentDockerfile',
        };
        await executeVerification(pluginConfig, 'EMISSINGDOCKERFILE');
    });

    it('should pass with valid configuration', async () => {
        const pluginConfig = {
            destination: ['registry.example.com/my-image:${version}'],
            dockerfile: 'tst/integ/resources/test.Dockerfile',
        };
        await executeVerification(pluginConfig);
    });

    it('should verify required environment variables are set', async () => {
        process.env.KANIKO_DESTINATION = 'registry.example.com/my-image:${version}';
        process.env.KANIKO_DOCKERFILE = 'tst/integ/resources/test.Dockerfile';
        const pluginConfig = {};
        await executeVerification(pluginConfig);
    });
});
