import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault } from '@tests/test-utils.js';

describe('extended ESLint rules', () => {
    describe('block-spacing', () => {
        it('should enforce block spacing', async () => {
            const code = 'function test(){return true;}';
            expect(await lintDefault(code)).toHaveRuleError('block-spacing');
        });
    });

    describe('capitalized-comments', () => {
        it('should enforce capitalized comments', async () => {
            const code = dedent`
                const fn = (x) => x; //an uncapitalized comment without a space before it
                // This comment is valid since it has the correct capitalization.
                // this comment is ignored since it follows another comment,
                // and this one as well because it follows yet another comment.
            `;
            expect(await lintDefault(code)).toHaveRuleWarning('capitalized-comments');
        });
    });

    describe('comma-spacing', () => {
        it('should enforce comma spacing', async () => {
            const code = dedent`
                const arr = [1,2,3];
                const obj = {a:1,b:2};
            `;
            expect(await lintDefault(code)).toHaveRuleError('comma-spacing');
        });
    });

    describe('key-spacing', () => {
        it('should enforce key spacing', async () => {
            const code = dedent`
                const fn = (x) => x;
                fn({a:1});
            `;
            expect(await lintDefault(code)).toHaveRuleWarning('key-spacing');
        });
    });

    describe('keyword-spacing', () => {
        it('should enforce keyword spacing', async () => {
            const code = 'if(true){return;}';
            expect(await lintDefault(code)).toHaveRuleError('keyword-spacing');
        });
    });

    describe('no-multi-spaces', () => {
        it('should enforce no multiple spaces', async () => {
            const code = 'const x = 1;  const y = 2;';
            expect(await lintDefault(code)).toHaveRuleError('no-multi-spaces');
        });
    });

    describe('no-multiple-empty-lines', () => {
        it('should throw error for multiple empty lines', async () => {
            const code = dedent`
            const x = 1;


            const y = 2;`;
            expect(await lintDefault(code)).toHaveRuleWarning('no-multiple-empty-lines');
        });
    });

    describe('object-curly-spacing', () => {
        it('should enforce object curly spacing', async () => {
            const code = dedent`
                const fn = (x) => x;
                fn({a:1});
            `;
            expect(await lintDefault(code)).toHaveRuleWarning('object-curly-spacing');
        });
    });

    describe('quote-props', () => {
        it('should enforce quote props as needed', async () => {
            const code = "const obj = {'prop': 1, 'valid-prop': 2};";
            expect(await lintDefault(code)).toHaveRuleWarning('quote-props');
        });
    });

    describe('quotes', () => {
        it('should enforce single quotes', async () => {
            const code = 'const notUsed = "5";';
            expect(await lintDefault(code)).toHaveRuleError('quotes');
        });
    });

    describe('semi', () => {
        it('should enforce semicolons', async () => {
            const code = dedent`
                const x = 1
                const y = 2
            `;
            expect(await lintDefault(code)).toHaveRuleError('semi');
        });
    });

    describe('space-before-blocks', () => {
        it('should enforce space before blocks', async () => {
            const code = 'function test(){return true;}';
            expect(await lintDefault(code)).toHaveRuleError('space-before-blocks');
        });
    });

    describe('space-in-parens', () => {
        it('should enforce no space in parens', async () => {
            const code = dedent`
                const result = ( 1 + 2 );
                function test( x ) { return x; }
            `;
            expect(await lintDefault(code)).toHaveRuleError('space-in-parens');
        });
    });

    describe('space-infix-ops', () => {
        it('should enforce space around infix operators', async () => {
            const code = dedent`
                const x = 1+2;
                const y = 3*4;
            `;
            expect(await lintDefault(code)).toHaveRuleError('space-infix-ops');
        });
    });

    describe('spaced-comment', () => {
        it('should enforce spaced comments', async () => {
            const code = 'const fn = (x) => x; //an uncapitalized comment without a space before it';
            expect(await lintDefault(code)).toHaveRuleError('spaced-comment');
        });
    });

    describe('no-unneeded-ternary', () => {
        it('should enforce no unneeded ternary', async () => {
            const code = 'const value = x === 2 ? true : false;';
            expect(await lintDefault(code)).toHaveRuleError('no-unneeded-ternary');
        });
    });

    describe('no-use-before-define', () => {
        it('should enforce no use before define', async () => {
            const code = dedent`
                console.log(x);
                const x = 5;
            `;
            expect(await lintDefault(code)).toHaveRuleError('no-use-before-define');
        });
    });

    describe('no-restricted-syntax', () => {
        it('should throw error for numeric enum', async () => {
            const code = dedent`
                enum Status {
                    Active,
                    Inactive,
                }
            `;
            expect(await lintDefault(code)).toHaveRuleError('no-restricted-syntax');
        });

        it('should throw error for string enum', async () => {
            const code = dedent`
                enum Color {
                    Red = 'red',
                    Green = 'green',
                    Blue = 'blue',
                }
            `;
            expect(await lintDefault(code)).toHaveRuleError('no-restricted-syntax');
        });

        it('should throw error for const enum', async () => {
            const code = dedent`
                const enum Direction {
                    Up,
                    Down,
                    Left,
                    Right,
                }
            `;
            expect(await lintDefault(code)).toHaveRuleError('no-restricted-syntax');
        });

        it('should throw error for enum with mixed values', async () => {
            const code = dedent`
                enum Mixed {
                    First = 1,
                    Second = 'second',
                }
            `;
            expect(await lintDefault(code)).toHaveRuleError('no-restricted-syntax');
        });

        it('should not throw error for union type (alternative to enum)', async () => {
            const code = dedent`
                type Status = 'active' | 'inactive';
            `;
            expect(await lintDefault(code)).toHaveNoRuleError('no-restricted-syntax');
        });

        it('should not throw error for const object (alternative to enum)', async () => {
            const code = dedent`
                const Status = {
                    Active: 'active',
                    Inactive: 'inactive',
                } as const;
            `;
            expect(await lintDefault(code)).toHaveNoRuleError('no-restricted-syntax');
        });

        it('should not throw error for regular code without enums', async () => {
            const code = dedent`
                function getStatus(): string {
                    return 'active';
                }
            `;
            expect(await lintDefault(code)).toHaveNoRuleError('no-restricted-syntax');
        });
    });

    describe('lines-between-class-members', () => {
        it('should enforce blank lines between class members', async () => {
            const code = dedent`
                class MyClass {
                    public methodOne() {
                        return 1;
                    }
                    public methodTwo() {
                        return 2;
                    }
                }
            `;
            expect(await lintDefault(code)).toHaveRuleError('lines-between-class-members');
        });

        it('should allow single-line members without blank line after', async () => {
            const code = dedent`
                class MyClass {
                    public prop = 1;
                    public method() {}
                }
            `;
            expect(await lintDefault(code)).toHaveNoRuleError('lines-between-class-members');
        });

        it('should enforce blank line between multi-line members', async () => {
            const code = dedent`
                class MyClass {
                    public methodOne() {
                        return 1;
                    }
                    public methodTwo() {
                        return 2;
                    }
                }
            `;
            expect(await lintDefault(code)).toHaveRuleError('lines-between-class-members');
        });

        it('should not throw error when blank lines are present', async () => {
            const code = dedent`
                class MyClass {
                    public prop = 1;

                    public methodOne() {
                        return 1;
                    }

                    public methodTwo() {
                        return 2;
                    }
                }
            `;
            expect(await lintDefault(code)).toHaveNoRuleError('lines-between-class-members');
        });
    });
});
