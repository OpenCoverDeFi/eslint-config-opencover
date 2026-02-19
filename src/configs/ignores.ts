import { globalIgnores } from 'eslint/config';
import { GLOB_EXCLUDE } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export function ignores(userIgnores: string[] = []): TypedFlatConfigItem[] {
    return [globalIgnores([...GLOB_EXCLUDE, ...userIgnores])] as TypedFlatConfigItem[];
}
