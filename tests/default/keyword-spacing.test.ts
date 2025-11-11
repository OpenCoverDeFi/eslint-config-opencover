import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'keyword-spacing';

describe(ruleName, () => {
	it('should enforce keyword spacing', async () => {
		const code = 'if(true){return;}';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
