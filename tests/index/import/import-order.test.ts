import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintDefault, expectRuleWarning } from '@tests/test-utils.js';

const ruleName = 'import/order';

describe(ruleName, () => {
    it('should enforce import order', async () => {
        const code = dedent`
            import { something } from './local';
            import fs from 'fs';
        `;
        const result = await lintDefault(code);
        expectRuleWarning(result, ruleName);
    });
});
