import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

const ruleName = 'unicorn/no-array-callback-reference';

describe(ruleName, () => {
    it('should throw error for array callback reference', async () => {
        const code = dedent`
            const callback = (element) => element * 2;
            const array = [1, 2, 3];
            const foo = array.map(callback);
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });
});
