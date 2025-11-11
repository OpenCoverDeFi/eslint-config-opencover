import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

const ruleName = '@typescript-eslint/member-ordering';

describe(ruleName, () => {
	it('should throw error when instance method comes before constructor', async () => {
		const code = dedent`
			class Test {
				public method(): void {
				}
				constructor() {
				}
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when constructor comes before instance field', async () => {
		const code = dedent`
			class Test {
				constructor() {
				}
				private field: string;
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when static method comes before static field', async () => {
		const code = dedent`
			class Test {
				public static staticMethod(): void {
				}
				private static staticField: string;
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when private instance method comes before public instance method', async () => {
		const code = dedent`
			class Test {
				private privateField: string;
				constructor() {
				}
				private privateMethod(): void {
				}
				public publicMethod(): void {
				}
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when protected instance field comes before public instance field', async () => {
		const code = dedent`
			class Test {
				protected protectedField: string;
				public publicField: string;
				constructor() {
				}
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for correct member ordering', async () => {
		const code = dedent`
			class Test {
				private static readonly CONSTANT = 'value';
				private static staticField: string;
				public publicField: string;
				protected protectedField: string;
				private privateField: string;
				constructor() {
				}
				public static staticMethod(): void {
				}
				public publicMethod(): void {
				}
				protected protectedMethod(): void {
				}
				private privateMethod(): void {
				}
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for class with only constructor', async () => {
		const code = dedent`
			class Test {
				constructor() {
				}
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for class with only static members', async () => {
		const code = dedent`
			class Test {
				public static staticField: string;
				public static staticMethod(): void {
				}
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
