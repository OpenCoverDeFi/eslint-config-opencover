import { ignores } from '../configs/ignores.js';
import { javascript } from '../configs/javascript.js';
import { typescript } from '../configs/typescript.js';
import { stylistic } from '../configs/stylistic.js';
import { imports } from '../configs/imports.js';
import { unicorn } from '../configs/unicorn.js';
import { test } from '../configs/test.js';
import type { TypedFlatConfigItem } from '../types.js';

/**
 * OpenCover recommended ESLint flat config preset.
 *
 * Includes: ignores, javascript, typescript, stylistic, imports, unicorn, test.
 *
 * For React projects, spread the `react` config after this preset:
 * @example
 * import { recommended, react } from '@opencover/eslint-config';
 * export default [...recommended, ...react];
 */
export const recommended: TypedFlatConfigItem[] = [
    ...ignores,
    ...javascript,
    ...typescript,
    ...stylistic,
    ...imports,
    ...unicorn,
    ...test,
];
