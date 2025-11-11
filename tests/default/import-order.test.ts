import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'import/order';

describe(ruleName, () => {
	it('should enforce import order', async () => {
		const code = `import { something } from './local';
	import fs from 'fs';
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
