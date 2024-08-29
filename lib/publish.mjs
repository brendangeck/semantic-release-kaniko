import { execa } from 'execa';
import { parseConfig, toKanikoArgs } from './config.mjs';

async function publish(pluginConfig, context) {
    const { logger, nextRelease } = context;

    // Parse configuration
    const config = parseConfig(pluginConfig);

    config.destination = config.destination.map(destination => {
        return destination.replace('${version}', nextRelease.version);
    });

    logger.log(`Building and pushing Docker image with the following destinations: ${config.destination.join(', ')}`);

    try {
        const kanikoArgs = toKanikoArgs(config);
        await execa('/kaniko/executor', kanikoArgs);
        logger.log(`Successfully built and pushed images: ${config.destination.join(', ')}`);
    } catch (error) {
        logger.error(`Failed to build and push images: ${config.destination.join(', ')}`);
        throw error;
    }

    logger.log('Docker image publishing complete.');
}

export { publish };
