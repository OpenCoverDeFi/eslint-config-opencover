import { ignores, imports, javascript, stylistic, test, typescript, unicorn } from '../configs/index.js';
import type { TypedFlatConfigItem } from '../types.js';

/**
 * OpenCover recommended ESLint flat config preset.
 *
 * Includes: ignores, javascript, typescript, stylistic, imports, unicorn, test.
 *
 * For React projects, spread the `react` config after this preset:
 * @example
 * import { recommended, react } from '@opencover/eslint-config';
 * export default [...recommended, ...(await react())];
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
