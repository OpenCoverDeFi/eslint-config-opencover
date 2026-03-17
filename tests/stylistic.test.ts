import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('stylistic', () => {
    describe('@stylistic/spaced-comment', () => {
        it('requires space after //', async () => {
            const results = await lint('//not fine', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === '@stylistic/spaced-comment')).toHaveLength(1);
            });
        });

        it('allows space after //', async () => {
            const results = await lint('// Fine', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === '@stylistic/spaced-comment')).toHaveLength(0);
            });
        });
    });

    describe('@stylistic/lines-between-class-members', () => {
        it('requires blank line between multi-line class members', async () => {
            const code = [
                'class Foo {',
                '  public a(): void {',
                '    return;',
                '  }',
                '  public b(): void {',
                '    return;',
                '  }',
                '}',
            ].join('\n');

            const results = await lint(code, 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/lines-between-class-members')
                ).toHaveLength(1);
            });
        });

        it('allows single-line class members without blank line', async () => {
            const code = ['class Foo {', '  public a = 1;', '  public b = 2;', '}'].join('\n');
            const results = await lint(code, 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/lines-between-class-members')
                ).toHaveLength(0);
            });
        });
    });

    describe('@stylistic/padding-line-between-statements', () => {
        it('requires blank line before function', async () => {
            const results = await lint('const x = 1;\nfunction foo() {}', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/padding-line-between-statements')
                ).toHaveLength(1);
            });
        });

        it('allows blank line before function', async () => {
            const results = await lint('const _x = 1;\n\nfunction foo() {}', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/padding-line-between-statements')
                ).toHaveLength(0);
            });
        });

        it('requires blank line after function', async () => {
            const results = await lint('function foo() {}\nconst x = 1;', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/padding-line-between-statements')
                ).toHaveLength(1);
            });
        });

        it('requires blank line before if', async () => {
            const results = await lint('const x = 1;\nif (x) {}', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/padding-line-between-statements')
                ).toHaveLength(1);
            });
        });

        it('requires blank line before export', async () => {
            const results = await lint('const x = 1;\nexport { x };', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/padding-line-between-statements')
                ).toHaveLength(1);
            });
        });

        it('requires blank line before class', async () => {
            const results = await lint('const _x = 1;\nclass Foo {}', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@stylistic/padding-line-between-statements')
                ).toHaveLength(1);
            });
        });
    });
});
