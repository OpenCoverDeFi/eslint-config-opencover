import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

const ruleName = '@typescript-eslint/explicit-member-accessibility';

describe(ruleName, () => {
    it('should throw error for property without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				field: string;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for method without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				method(): void {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for constructor without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				constructor() {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for getter without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				get value(): string {
					return 'test';
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for setter without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				set value(val: string) {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for static property without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				static field: string;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for static method without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				static method(): void {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for public property', async () => {
        const code = dedent`
			class Test {
				public field: string;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for private property', async () => {
        const code = dedent`
			class Test {
				private field: string;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for protected property', async () => {
        const code = dedent`
			class Test {
				protected field: string;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for public method', async () => {
        const code = dedent`
			class Test {
				public method(): void {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for private method', async () => {
        const code = dedent`
			class Test {
				private method(): void {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for protected method', async () => {
        const code = dedent`
			class Test {
				protected method(): void {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for public constructor', async () => {
        const code = dedent`
			class Test {
				public constructor() {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for private constructor', async () => {
        const code = dedent`
			class Test {
				private constructor() {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for protected constructor', async () => {
        const code = dedent`
			class Test {
				protected constructor() {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for public static property', async () => {
        const code = dedent`
			class Test {
				public static field: string;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for private static method', async () => {
        const code = dedent`
			class Test {
				private static method(): void {
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for readonly property with accessibility modifier', async () => {
        const code = dedent`
			class Test {
				public readonly field: string = 'test';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should throw error for readonly property without accessibility modifier', async () => {
        const code = dedent`
			class Test {
				readonly field: string = 'test';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for class with all explicit accessibility modifiers', async () => {
        const code = dedent`
			class Test {
				public publicField: string;
				protected protectedField: string;
				private privateField: string;
				public constructor() {
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

    it('should not throw error for abstract method with accessibility modifier', async () => {
        const code = dedent`
			abstract class Test {
				public abstract method(): void;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should throw error for abstract method without accessibility modifier', async () => {
        const code = dedent`
			abstract class Test {
				abstract method(): void;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });
});
