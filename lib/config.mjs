/**
 * Utility function to convert environment variable string to boolean.
 * @param {string} value - The environment variable value.
 * @returns {boolean} - The boolean representation of the value.
 */
function toBoolean(value) {
    if (typeof value === 'string') {
        return value.toLowerCase() === 'true' || value === '1';
    }
    return Boolean(value);
}

/**
 * Parses the configuration from pluginConfig and environment variables.
 * @param {Object} pluginConfig - The plugin configuration.
 * @returns {Object} - The parsed configuration.
 */
function parseConfig(pluginConfig) {
    return {
        image: pluginConfig.image || process.env.IMAGE,
        tags: pluginConfig.tags || (process.env.TAGS ? process.env.TAGS.split(',') : []),
        dockerfile: pluginConfig.dockerfile || process.env.DOCKERFILE || 'Dockerfile',
        registry: pluginConfig.registry || process.env.REGISTRY,
        username: pluginConfig.username || process.env.DOCKER_USERNAME,
        password: pluginConfig.password || process.env.DOCKER_PASSWORD,
        insecure: toBoolean(pluginConfig.insecure || process.env.INSECURE),
        target: pluginConfig.target || process.env.TARGET,
        cache: toBoolean(pluginConfig.cache || process.env.CACHE),
        cacheTTL: pluginConfig.cacheTTL || process.env.CACHE_TTL || '24h',
        kanikoDir: pluginConfig.kanikoDir || process.env.KANIKO_DIR,
        kanikoArgs: pluginConfig.kanikoArgs || (process.env.KANIKO_ARGS ? process.env.KANIKO_ARGS.split(' ') : []),
    };
}

export { toBoolean, parseConfig };
