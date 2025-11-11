import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'block-spacing';

describe('block-spacing', () => {
	it('should enforce block spacing', async () => {
		const code = 'function test(){return true;}';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
