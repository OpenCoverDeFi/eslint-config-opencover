import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefaultConfig } from '@tests/test-utils.js';

const ruleName = '@opencover-eslint/no-unnecessary-as-assertion';

describe(ruleName, () => {
    it('should throw error for unnecessary type assertion on string literal', async () => {
        const code = dedent`
            const value: string = 'hello';
            const result = value as string;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on number literal', async () => {
        const code = dedent`
            const value: number = 42;
            const result = value as number;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on object', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex as Example;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on array', async () => {
        const code = dedent`
            const arr: string[] = ['a', 'b'];
            const result = arr as string[];
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion when types are equivalent', async () => {
        const code = dedent`
            type A = string;
            const value: A = 'test';
            const result = value as A;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on function return type', async () => {
        const code = dedent`
            function getString(): string {
                return 'hello';
            }
            const result = getString() as string;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on interface', async () => {
        const code = dedent`
            interface Person {
                name: string;
            }
            const person: Person = { name: 'John' };
            const result = person as Person;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error when assertion is actually needed from unknown', async () => {
        const code = dedent`
            function getValue(): unknown {
                return 'hello';
            }
            const result = getValue() as string;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on union when type can be inferred', async () => {
        const code = dedent`
            const value: string | number = 'hello';
            const result = value as string;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary type assertion on discriminated union', async () => {
        const code = dedent`
            type A = { type: 'a'; value: string };
            type B = { type: 'b'; value: number };
            const value: A | B = { type: 'a', value: 'test' };
            const result = value as A;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error when assertion is needed for any type', async () => {
        const code = dedent`
            function getValue(): any {
                return 'hello';
            }
            const result = getValue() as string;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for unnecessary assertion on readonly array', async () => {
        const code = dedent`
            const arr: readonly string[] = ['a', 'b'];
            const result = arr as readonly string[];
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary assertion with type alias', async () => {
        const code = dedent`
            type Id = string;
            const id: Id = '123';
            const result = id as Id;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error for "as const" assertion', async () => {
        const code = dedent`
            const tuple = ['a', 'b'] as const;
            const obj = { key: 'value' } as const;
            const arr = [1, 2, 3] as const;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });
});
