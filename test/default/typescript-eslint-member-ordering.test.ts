import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/member-ordering';

describe(ruleName, () => {
	it('should throw error when instance method comes before constructor', async () => {
		const code = `class Test {
		public method(): void {
		}
		constructor() {
		}
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when constructor comes before instance field', async () => {
		const code = `class Test {
		constructor() {
		}
		private field: string;
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when static method comes before static field', async () => {
		const code = `class Test {
		public static staticMethod(): void {
		}
		private static staticField: string;
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when private instance method comes before public instance method', async () => {
		const code = `class Test {
		private privateField: string;
		constructor() {
		}
		private privateMethod(): void {
		}
		public publicMethod(): void {
		}
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error when protected instance field comes before public instance field', async () => {
		const code = `class Test {
		protected protectedField: string;
		public publicField: string;
		constructor() {
		}
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for correct member ordering', async () => {
		const code = `class Test {
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
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for class with only constructor', async () => {
		const code = `class Test {
		constructor() {
		}
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for class with only static members', async () => {
		const code = `class Test {
		public static staticField: string;
		public static staticMethod(): void {
		}
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
