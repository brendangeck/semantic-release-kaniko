import { execa } from 'execa';
import { parseConfig } from './config.mjs';

async function publish(pluginConfig, context) {
    const { logger, nextRelease } = context;

    // Parse configuration
    const config = parseConfig(pluginConfig);

    if (!config.image || !config.registry) {
        throw new Error('Both image and registry must be specified.');
    }

    const destinations = config.tags.map(tag => {
        const tagName = `${config.image}:${tag === '${version}' ? nextRelease.version : tag}`;
        return `${config.registry}/${tagName}`;
    });

    logger.log(`Building and pushing Docker image with the following destinations: ${destinations.join(', ')}`);

    try {
        const kanikoArgs = [
            '--dockerfile',
            config.dockerfile,
            '--context',
            '.',
            ...destinations.flatMap(destination => ['--destination', destination])
        ];

        if (config.target) kanikoArgs.push('--target', config.target); // Add target if specified
        if (config.insecure) kanikoArgs.push('--insecure'); // Set to insecure mode if specified
        if (config.cache) kanikoArgs.push('--cache'); // Enable cache if specified
        if (config.cache && config.cacheTTL) kanikoArgs.push('--cache-ttl', config.cacheTTL); // Set cache TTL if specified
        if (config.kanikoDir) kanikoArgs.push('--kaniko-dir', config.kanikoDir); // Set an alternative staging folder for Kaniko

        // Append user-defined Kaniko arguments
        if (config.kanikoArgs) {
            kanikoArgs.push(...config.kanikoArgs);
        }

        const env = {};
        if (config.username) env.DOCKER_USERNAME = config.username;
        if (config.password) env.DOCKER_PASSWORD = config.password;

        await execa('/kaniko/executor', kanikoArgs, { env });
        logger.log(`Successfully built and pushed images: ${destinations.join(', ')}`);
    } catch (error) {
        logger.error(`Failed to build and push images: ${destinations.join(', ')}`);
        throw error;
    }

    logger.log('Docker image publishing complete.');
}

export { publish };
