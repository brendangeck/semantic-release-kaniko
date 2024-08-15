import SemanticReleaseError from '@semantic-release/error';
import { execa } from 'execa';
import { promises as fs } from 'fs';
import { parseConfig } from './config';

// Error messages
const ERRORS = {
    MISSING_KANIKO: 'Kaniko is not installed or not in PATH',
    MISSING_REGISTRY: 'Missing Docker registry in configuration',
    MISSING_IMAGE: 'Missing Docker image name in configuration',
    MISSING_TAGS: 'Missing image tags in configuration',
    DOCKERFILE_NOT_FOUND: path => `Dockerfile not found at ${path}`,
    REGISTRY_AUTH: 'Not authenticated with Docker registry',
};

/**
 * Verify the conditions for the semantic-release-dockerless plugin using Kaniko.
 * @param {Object} pluginConfig - The plugin configuration.
 * @param {Object} context - The semantic-release context.
 */
async function verifyConditions(pluginConfig, context) {
    const { logger } = context;

    // Check if Kaniko is installed and accessible
    try {
        await execa('/kaniko/executor', ['version']);
        logger.info('Kaniko is installed and accessible.');
    } catch (_error) {
        throw new SemanticReleaseError(ERRORS.MISSING_KANIKO, 'EKANIKOOMISSING');
    }

    // Parse configuration
    const config = parseConfig(pluginConfig);

    // Verify required configuration fields
    if (!config.registry) {
        throw new SemanticReleaseError(ERRORS.MISSING_REGISTRY, 'EMISSINGREGISTRY');
    }
    if (!config.dockerImage) {
        throw new SemanticReleaseError(ERRORS.MISSING_IMAGE, 'EMISSINGIMAGE');
    }
    if (!Array.isArray(config.tags) || config.tags.length === 0) {
        throw new SemanticReleaseError(ERRORS.MISSING_TAGS, 'EMISSINGTAGS');
    }

    // Check if Dockerfile exists
    try {
        await fs.access(config.dockerfile);
        logger.info(`Dockerfile found at ${config.dockerfile}`);
    } catch (_error) {
        throw new SemanticReleaseError(
            ERRORS.DOCKERFILE_NOT_FOUND(config.dockerfile),
            'EDOCKERFILENOTFOUND'
        );
    }

    logger.log('semantic-release-kaniko plugin configuration verified.');
}

export { verifyConditions };
