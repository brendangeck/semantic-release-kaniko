module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/npm',
        '@semantic-release/github',
        '@semantic-release/git',
    ],
};
