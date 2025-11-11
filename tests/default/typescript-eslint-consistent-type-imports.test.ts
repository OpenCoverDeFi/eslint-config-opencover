import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/consistent-type-imports';

describe(ruleName, () => {
	it('should throw error for regular import of type', async () => {
		const code = `import { Example } from './example';
	type Test = Example;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for regular import of interface', async () => {
		const code = `import { MyInterface } from './types';
	const obj: MyInterface = {};
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for regular import of type alias', async () => {
		const code = `import { MyType } from './types';
	const value: MyType = 'test';
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for import type', async () => {
		const code = `import type { Example } from './example';
	type Test = Example;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for regular import of value', async () => {
		const code = `import { myFunction } from './utils';
	const result = myFunction();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should throw error for mixed import with type', async () => {
		const code = `import { MyType, myFunction } from './module';
	const value: MyType = 'test';
	const result = myFunction();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
