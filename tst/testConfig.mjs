import { parseConfig, toKanikoArgs } from '../lib/config.mjs';

// Function to run a test case
function runTestCase(description, envVars, expectedDest, expectedMirror) {
    console.log(`\n--- ${description} ---`);

    // Clear environment variables before each test
    delete process.env.KANIKO_DESTINATION;
    delete process.env.KANIKO_REGISTRY_MIRROR;

    // Set environment variables for the test
    if (envVars.destination) {
        process.env.KANIKO_DESTINATION = envVars.destination;
    }
    if (envVars.registryMirror) {
        process.env.KANIKO_REGISTRY_MIRROR = envVars.registryMirror;
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
    if (JSON.stringify(config.destination) !== JSON.stringify(expectedDest)) {
        console.error('Test failed: destination did not match expected value');
    } else {
        console.log('Destination matched expected value');
    }
    if (JSON.stringify(config.registryMirror) !== JSON.stringify(expectedMirror)) {
        console.error('Test failed: registryMirror did not match expected value');
    } else {
        console.log('RegistryMirror matched expected value');
    }
}

// Test Cases
runTestCase(
    'Test with JSON array as environment variable',
    {
        destination: '["registry.example.commy-image:${version}","registry.example.commy-image:latest"]',
        registryMirror: '["mock-registry-mirror:5000"]'
    },
    [
        'registry.example.commy-image:${version}',
        'registry.example.commy-image:latest'
    ],
    ['mock-registry-mirror:5000']
);

runTestCase(
    'Test with comma-separated string as environment variable',
    {
        destination: 'registry.example.commy-image:${version},registry.example.commy-image:latest',
        registryMirror: 'mock-registry-mirror:5000'
    },
    [
        'registry.example.commy-image:${version}',
        'registry.example.commy-image:latest'
    ],
    ['mock-registry-mirror:5000']
);

runTestCase(
    'Test with single string as environment variable',
    {
        destination: 'registry.example.commy-image:latest',
        registryMirror: 'mock-registry-mirror:5000'
    },
    ['registry.example.commy-image:latest'],
    ['mock-registry-mirror:5000']
);

runTestCase(
    'Test with invalid JSON string (fallback to string array)',
    {
        destination: '["registry.example.commy-image:latest"',
        registryMirror: '["mock-registry-mirror:5000"]'
    },
    ['["registry.example.commy-image:latest"'], // treated as a single string in array
    ['mock-registry-mirror:5000']
);

runTestCase(
    'Test with no environment variables set',
    {},
    undefined, // Expecting undefined because no destination is set
    undefined  // Expecting undefined because no registry mirror is set
);
