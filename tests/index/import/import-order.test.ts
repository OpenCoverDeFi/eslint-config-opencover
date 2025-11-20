import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault } from '@tests/test-utils.js';

const ruleName = 'import/order';

describe(ruleName, () => {
    it('should enforce import order', async () => {
        expect(
            await lintDefault(dedent`
                import { something } from './local';
                import fs from 'fs';
            `)
        ).toHaveRuleWarning(ruleName);
    });
});
