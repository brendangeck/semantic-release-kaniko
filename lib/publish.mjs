import { execa } from 'execa';

async function publish(pluginConfig, context) {
    const { logger, nextRelease } = context;
    const { project, image, tags, dockerfile, registry, username, password, insecure } =
        pluginConfig;

    const dockerfilePath = dockerfile || 'Dockerfile';
    const fullImageName = `${project}/${image}`;

    for (const tag of tags) {
        const tagName = `${fullImageName}:${tag === '${version}' ? nextRelease.version : tag}`;
        const fullUri = `${registry}/${tagName}`;

        logger.log(`Building and pushing Docker image: ${fullUri}`);

        try {
            const kanikoArgs = [
                '--dockerfile',
                dockerfilePath,
                '--context',
                '.',
                '--destination',
                fullUri,
            ];

            if (insecure) kanikoArgs.push('--insecure');

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
