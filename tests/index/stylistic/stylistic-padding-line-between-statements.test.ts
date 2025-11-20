import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault } from '@tests/test-utils.js';

const ruleName = '@stylistic/padding-line-between-statements';

describe(ruleName, () => {
    it('should enforce blank line before function declaration', async () => {
        expect(
            await lintDefault(dedent`
                const x = 1;
                function foo() {}
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after function declaration', async () => {
        expect(
            await lintDefault(dedent`
                function foo() {}
                const x = 1;
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line before class declaration', async () => {
        expect(
            await lintDefault(dedent`
                const x = 1;
                class MyClass {}
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after class declaration', async () => {
        expect(
            await lintDefault(dedent`
                class MyClass {}
                const x = 1;
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line before export', async () => {
        expect(
            await lintDefault(dedent`
                const x = 1;
                export const y = 2;
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after export', async () => {
        expect(
            await lintDefault(dedent`
                export const y = 2;
                const x = 1;
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line before if statement', async () => {
        expect(
            await lintDefault(dedent`
                const x = 1;
                if (x > 0) {}
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after block-like statement before if', async () => {
        expect(
            await lintDefault(dedent`
                function foo() {}
                if (true) {}
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after if statement', async () => {
        expect(
            await lintDefault(dedent`
                if (true) {}
                const x = 1;
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should not throw error when blank lines are present', async () => {
        expect(
            await lintDefault(dedent`
                const x = 1;

                function foo() {}

                class MyClass {}

                export const y = 2;

                if (x > 0) {}

                const z = 3;
            `)
        ).toHaveNoRuleError(ruleName);
    });
});
