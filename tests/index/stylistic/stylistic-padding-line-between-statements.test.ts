import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@/index.js';

const ruleName = '@stylistic/padding-line-between-statements';

describe(ruleName, () => {
    it('should enforce blank line before function declaration', async () => {
        const code = dedent`
            const x = 1;
            function foo() {}
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line after function declaration', async () => {
        const code = dedent`
            function foo() {}
            const x = 1;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line before class declaration', async () => {
        const code = dedent`
            const x = 1;
            class MyClass {}
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line after class declaration', async () => {
        const code = dedent`
            class MyClass {}
            const x = 1;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line before export', async () => {
        const code = dedent`
            const x = 1;
            export const y = 2;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line after export', async () => {
        const code = dedent`
            export const y = 2;
            const x = 1;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line before if statement', async () => {
        const code = dedent`
            const x = 1;
            if (x > 0) {}
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line after block-like statement before if', async () => {
        const code = dedent`
            function foo() {}
            if (true) {}
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should enforce blank line after if statement', async () => {
        const code = dedent`
            if (true) {}
            const x = 1;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should not throw error when blank lines are present', async () => {
        const code = dedent`
            const x = 1;

            function foo() {}

            class MyClass {}

            export const y = 2;

            if (x > 0) {}

            const z = 3;
        `;
        const result = await lintText(defaultConfig, code);
        expectNoRuleError(result, ruleName);
    });
});
