import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

describe('typescript-eslint extended rules', () => {
    it('should enforce consistent-type-imports', async () => {
        const code = dedent`
            import { Example } from './example';
            type Test = Example;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/consistent-type-imports');
    });

    it('should enforce explicit-member-accessibility', async () => {
        const code = dedent`
            class Test {
                field: string;
            }
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/explicit-member-accessibility');
    });

    it('should enforce member-ordering', async () => {
        const code = dedent`
            class Test {
                public method(): void {
                }
                constructor() {
                }
            }
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/member-ordering');
    });

    it('should enforce no-non-null-assertion', async () => {
        const code = dedent`
            const value: string | null = null;
            const result = value!.toString();
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/no-non-null-assertion');
    });

    it('should enforce no-restricted-types (Map and Set)', async () => {
        const code = dedent`
            const map: Map<string, number> = new Map();
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/no-restricted-types');
    });

    it('should enforce no-unnecessary-type-assertion', async () => {
        const code = dedent`
            const value: string = 'hello';
            const result = value as string;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/no-unnecessary-type-assertion');
    });

    it('should enforce no-unsafe-enum-comparison', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
            }
            const status: Status = Status.Open;
            if (status === 'open') {
            }
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/no-unsafe-enum-comparison');
    });

    it('should enforce no-unused-vars', async () => {
        const code = dedent`
            const unusedVar = 42;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, '@typescript-eslint/no-unused-vars');
    });
});
