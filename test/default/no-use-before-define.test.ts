import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'no-use-before-define';

describe(ruleName, () => {
	it('should error when variable is used before definition', async () => {
		const code = `console.log(x);
const x = 5;
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not error when variable is used after definition', async () => {
		const code = `const x = 5;
console.log(x);
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should error when function is used before definition', async () => {
		const code = `foo();
function foo() {
	return 1;
}
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not error when function is used after definition', async () => {
		const code = `function foo() {
	return 1;
}
foo();
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should error when class is used before definition', async () => {
		const code = `const instance = new MyClass();
class MyClass {}
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not error when class is used after definition', async () => {
		const code = `class MyClass {}
const instance = new MyClass();
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
