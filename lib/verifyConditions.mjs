import SemanticReleaseError from '@semantic-release/error';
import { execa } from 'execa';
import { promises as fs } from 'fs';
import { parseConfig } from './config.mjs';

// Error messages
const ERRORS = {
    MISSING_KANIKO: '/kaniko/executor is not found in PATH. Are you using a container with kaniko installed?',
    MISSING_DOCKERFILE: path => `Dockerfile not found at ${path}`,
    MISSING_DESTINATION: 'You must set at least one destination',
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
        throw new SemanticReleaseError(ERRORS.MISSING_KANIKO, 'EMISSINGKANIKO');
    }

    // Parse configuration
    const config = parseConfig(pluginConfig);

    // Check if Dockerfile exists at specified path
    if (!config.dockerfile) {
        logger.info('Dockerfile path is not set, defaulting to Dockerfile');
    }
    const dockerfilePath = config.dockerfile || 'Dockerfile';

    try {
        await fs.access(dockerfilePath);
        logger.info(`Dockerfile found at ${dockerfilePath}`);
    } catch (_error) {
        throw new SemanticReleaseError(ERRORS.MISSING_DOCKERFILE(dockerfilePath), 'EMISSINGDOCKERFILE');
    }

    // Check if destination is set
    if (!config.destination) {
        throw new SemanticReleaseError(ERRORS.MISSING_DESTINATION, 'EMISSINGDESTINATION');
    }

    logger.log('semantic-release-kaniko plugin configuration verified.');
}

export { verifyConditions };
