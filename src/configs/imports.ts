import importPlugin from 'eslint-plugin-import-x';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const imports: TypedFlatConfigItem[] = [
    {
        name: 'opencover/imports',
        files: [GLOB_SRC],
        plugins: {
            'import-x': importPlugin,
        },
        rules: {
            'import-x/order': ['warn'],
            'import-x/prefer-default-export': 'off',
        },
    },
];
