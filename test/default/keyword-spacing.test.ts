import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('keyword-spacing', () => {
	it('should enforce keyword spacing', async () => {
		const code = `if(true){return;}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, 'keyword-spacing');
	});
});
