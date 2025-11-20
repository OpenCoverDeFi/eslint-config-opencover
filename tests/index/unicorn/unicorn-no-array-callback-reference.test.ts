import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefaultConfig } from '@tests/test-utils.js';

const ruleName = 'unicorn/no-array-callback-reference';

describe(ruleName, () => {
    it('should throw error for array callback reference', async () => {
        const code = dedent`
            const callback = (element) => element * 2;
            const array = [1, 2, 3];
            const foo = array.map(callback);
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });
});
