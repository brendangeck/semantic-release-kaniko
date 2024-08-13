module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/github',
    ],
    releaseRules: [
        { type: 'breaking', release: 'major' },
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'minor' },
        { type: 'docs', release: false },
        { type: 'chore', release: false },
        { type: 'style', release: false },
        { type: 'refactor', release: false },
        { type: 'test', release: false },
    ],
    preset: 'angular',
};
