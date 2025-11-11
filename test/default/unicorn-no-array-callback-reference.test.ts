import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('unicorn/no-array-callback-reference', () => {
	it('should throw error for array callback reference', async () => {
		const code = `const callback = (element) => element * 2;
	const array = [1, 2, 3];
	const foo = array.map(callback);
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, 'unicorn/no-array-callback-reference');
	});
});
