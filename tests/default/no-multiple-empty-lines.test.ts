import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'no-multiple-empty-lines';

describe(ruleName, () => {
	it('should throw error for multiple empty lines', async () => {
		const code = `const x = 1;


const y = 2;
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
