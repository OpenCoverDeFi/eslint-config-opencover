import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleWarning } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'no-multiple-empty-lines';

describe(ruleName, () => {
    it('should throw error for multiple empty lines', async () => {
        const code = dedent`
            const x = 1;


			const y = 2;`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleWarning(result, ruleName);
    });
});
