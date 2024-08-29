#!/bin/sh -l

# Check if package.json exists
if [ ! -f "$GITHUB_WORKSPACE/package.json" ]; then
    echo "Error: package.json not found in the workspace"
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Error: node is not installed"
    exit 1
fi

# Run npm install
echo "Running npm install..."
npm install

echo "Contents of GitHub Workspace:"
ls -la $GITHUB_WORKSPACE

echo "Running tests on $TEST_FILE..."
npx mocha $TEST_FILE
