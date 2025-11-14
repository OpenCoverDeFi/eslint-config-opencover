import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

const ruleName = 'no-use-before-define';

describe(ruleName, () => {
    it('should error when variable is used before definition', async () => {
        const code = dedent`
            console.log(x);
            const x = 5;
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not error when variable is used after definition', async () => {
        const code = dedent`
            const x = 5;
            console.log(x);
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should error when function is used before definition', async () => {
        const code = dedent`
            foo();
            function foo() {
                return 1;
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not error when function is used after definition', async () => {
        const code = dedent`
            function foo() {
                return 1;
            }
            foo();
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should error when class is used before definition', async () => {
        const code = dedent`
            const instance = new MyClass();
            class MyClass {}
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not error when class is used after definition', async () => {
        const code = dedent`
            class MyClass {}
            const instance = new MyClass();
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
