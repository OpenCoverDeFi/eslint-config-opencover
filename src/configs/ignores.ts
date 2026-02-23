import gitignore from 'eslint-config-flat-gitignore';
import { globalIgnores } from 'eslint/config';
import { GLOB_EXCLUDE } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const ignores: TypedFlatConfigItem[] = [
    gitignore({ name: 'opencover/gitignore', strict: false }),
    globalIgnores(GLOB_EXCLUDE) as TypedFlatConfigItem,
];
