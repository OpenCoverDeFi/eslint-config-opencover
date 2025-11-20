import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefaultConfig } from '@tests/test-utils.js';

const ruleName = 'import/order';

describe(ruleName, () => {
    it('should enforce import order', async () => {
        const code = dedent`
            import { something } from './local';
            import fs from 'fs';
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleWarning(ruleName);
    });
});
