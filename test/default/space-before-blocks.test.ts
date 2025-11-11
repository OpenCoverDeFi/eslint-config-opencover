import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'space-before-blocks';

describe(ruleName, () => {
	it('should enforce space before blocks', async () => {
		const code = `function test(){return true;}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
