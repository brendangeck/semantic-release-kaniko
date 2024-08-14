import { execa } from 'execa';

async function publish(pluginConfig, context) {
    const { logger, nextRelease } = context;

    // Read configuration from pluginConfig or environment variables
    const image = pluginConfig.image || process.env.DOCKER_IMAGE;
    const tags = pluginConfig.tags || (process.env.DOCKER_TAGS ? process.env.DOCKER_TAGS.split(',') : []);
    const dockerfile = pluginConfig.dockerfile || process.env.DOCKER_FILE || 'Dockerfile';
    const registry = pluginConfig.registry || process.env.DOCKER_REGISTRY;
    const username = pluginConfig.username || process.env.DOCKER_USERNAME;
    const password = pluginConfig.password || process.env.DOCKER_PASSWORD;
    const insecure = pluginConfig.insecure || process.env.DOCKER_INSECURE === 'true';
    const target = pluginConfig.target || process.env.DOCKER_TARGET; // Optional build target
    const cache = pluginConfig.cache || process.env.DOCKER_CACHE === 'false';
    const cacheTTL = pluginConfig.cache_ttl || process.env.DOCKER_CACHE_TTL || '24h'; // Default cache TTL to 24h
    const runCleanup = pluginConfig.run_cleanup || process.env.KANIKO_RUN_CLEANUP === 'false';

    if (!image || !registry) {
        throw new Error('Both dockerImage and registry must be specified.');
    }

    for (const tag of tags) {
        const tagName = `${dockerImage}:${tag === '${version}' ? nextRelease.version : tag}`;
        const fullUri = `${registry}/${tagName}`;

        logger.log(`Building and pushing Docker image: ${fullUri}`);

        try {
            const kanikoArgs = [
                '--dockerfile',
                dockerfile,
                '--context',
                '.',
                '--destination',
                fullUri
            ];

            if (target) kanikoArgs.push('--target', target); // Add target if specified
            if (insecure) kanikoArgs.push('--insecure');            
            if (cache) kanikoArgs.push('--cache=true'); // Enable cache if specified
            if (cacheTTL) kanikoArgs.push('--cache-ttl', cacheTTL); // Set cache TTL if specified
            if (runCleanup) kanikoArgs.push('--cleanup');

            const env = {};
            if (username) env.DOCKER_USERNAME = username;
            if (password) env.DOCKER_PASSWORD = password;

            await execa('/kaniko/executor', kanikoArgs, { env });
            logger.log(`Successfully built and pushed image: ${fullUri}`);
        } catch (error) {
            logger.error(`Failed to build and push image: ${fullUri}`);
            throw error;
        }
    }

    logger.log('Docker image publishing complete.');
}

export { publish };
