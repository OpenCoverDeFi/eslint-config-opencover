import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import type { Linter } from 'eslint';

const reactConfig: Linter.Config[] = [
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    {
        name: 'opencover/react',
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
];

export default reactConfig;
