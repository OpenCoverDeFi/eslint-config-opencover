import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintWithDefaultConfig } from '@tests/test-utils.js';

const ruleName = 'stylistic/padding-line-between-statements';

describe(ruleName, () => {
    it('should enforce blank line before function declaration', async () => {
        const code = dedent`
            const x = 1;
            function foo() {}
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after function declaration', async () => {
        const code = dedent`
            function foo() {}
            const x = 1;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line before class declaration', async () => {
        const code = dedent`
            const x = 1;
            class MyClass {}
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after class declaration', async () => {
        const code = dedent`
            class MyClass {}
            const x = 1;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line before export', async () => {
        const code = dedent`
            const x = 1;
            export const y = 2;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after export', async () => {
        const code = dedent`
            export const y = 2;
            const x = 1;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line before if statement', async () => {
        const code = dedent`
            const x = 1;
            if (x > 0) {}
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after block-like statement before if', async () => {
        const code = dedent`
            function foo() {}
            if (true) {}
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should enforce blank line after if statement', async () => {
        const code = dedent`
            if (true) {}
            const x = 1;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
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
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });
});
