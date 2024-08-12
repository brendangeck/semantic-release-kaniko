/**
 * No-op for the prepare stage.
 * @param {Object} pluginConfig - The plugin configuration.
 * @param {Object} context - The semantic-release context.
 */
async function prepare(_pluginConfig, context) {
    const { logger } = context;

    logger.info('Prepare stage unused for this plugin. Advancing to publish stage.');
}

export { prepare };
