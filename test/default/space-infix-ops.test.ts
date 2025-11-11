import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'space-infix-ops';

describe(ruleName, () => {
	it('should enforce space around infix operators', async () => {
		const code = `const x = 1+2;
	const y = 3*4;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
