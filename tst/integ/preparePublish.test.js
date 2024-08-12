import { prepare } from '../../lib/prepare.js';
import { publish } from '../../lib/publish.js';
import assert from 'assert';

// Merging prepare and publish into the same test suite to guarantee they run in order
describe('Prepare and Publish', function () {
    this.timeout(600000); // 10 minute timeout

    let context;
    let pluginConfig;

    beforeEach(() => {
        // Mock context and pluginConfig
        context = {
            logger: console,
            nextRelease: {
                version: '1.0.0',
            },
        };

        pluginConfig = {
            registry: 'mock-registry:5000',
            project: 'my-project',
            image: 'my-image',
            tags: ['${version}', 'latest'],
            dockerfile: 'tst/integ/resources/test.Dockerfile',
            username: 'test-user',
            password: 'test-password',
            insecure: true,
        };
    });

    it('should prepare Docker images', async () => {
        try {
            await prepare(pluginConfig, context);

            // Assume no error means success
        } catch (error) {
            assert.fail(`Failed to prepare Docker images: ${error.message}`);
        }
    });

    it('should push Docker images to the registry', async () => {
        try {
            await publish(pluginConfig, context);

            // Assume no error means success
        } catch (error) {
            assert.fail(`Failed to push Docker images: ${error.message}`);
        }
    });
});
