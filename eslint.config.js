import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.mocha,
            },
        },
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
];
