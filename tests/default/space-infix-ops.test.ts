import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'space-infix-ops';

describe(ruleName, () => {
    it('should enforce space around infix operators', async () => {
        const code = dedent`
			const x = 1+2;
			const y = 3*4;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });
});
