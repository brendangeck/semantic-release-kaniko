import { parseConfig, toKanikoArgs } from '../lib/config.mjs';

// Function to run a test case
function runTestCase(description, envVars, expectedCache, expectedCacheTTL, expectedDir, expectedTarget) {
    console.log(`\n--- ${description} ---`);

    // Clear environment variables before each test
    delete process.env.KANIKO_CACHE;
    delete process.env.KANIKO_CACHE_TTL;
    delete process.env.KANIKO_KANIKO_DIR;
    delete process.env.KANIKO_TARGET;

    // Set environment variables for the test
    if (envVars.cache) {
        process.env.KANIKO_CACHE = envVars.cache;
    }
    if (envVars.cacheTTL) {
        process.env.KANIKO_CACHE_TTL = envVars.cacheTTL;
    }
    if (envVars.kanikoDir) {
        process.env.KANIKO_KANIKO_DIR = envVars.kanikoDir;
    }
    if (envVars.target) {
        process.env.KANIKO_TARGET = envVars.target;
    }

    // Mock plugin configuration object
    const pluginConfig = {};

    // Parse configuration
    const config = parseConfig(pluginConfig);

    // Convert parsed config to Kaniko args
    const kanikoArgs = toKanikoArgs(config);

    // Output the results
    console.log('Parsed Config:', config);
    console.log('Kaniko Args:', kanikoArgs);

    // Assertions (could be replaced with an actual testing framework)
    if (config.cache !== expectedCache) {
        console.error('Test failed: cache did not match expected value');
    } else {
        console.log('Cache matched expected value');
    }
    if (config.cacheTTL !== expectedCacheTTL) {
        console.error('Test failed: cacheTTL did not match expected value');
    } else {
        console.log('cacheTTL matched expected value');
    }
    if (config.kanikoDir !== expectedDir) {
        console.error('Test failed: kanikoDir did not match expected value');
    } else {
        console.log('kanikoDir matched expected value');
    }
    if (config.target !== expectedTarget) {
        console.error('Test failed: target did not match expected value');
    } else {
        console.log('Target matched expected value');
    }
}

// New Test Case
runTestCase(
    'Test with cache, cacheTTL, and dir environment variables',
    {
        cache: 'true',
        cacheTTL: '48h',
        kanikoDir: '/tmp/kaniko',
        target: 'foo'
    },
    true,
    '48h',
    '/tmp/kaniko',
    'foo'
);
