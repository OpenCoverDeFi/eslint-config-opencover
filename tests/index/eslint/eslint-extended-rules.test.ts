import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault } from '@tests/test-utils.js';

describe('extended ESLint rules', () => {
    describe('block-spacing', () => {
        it('should enforce block spacing', async () => {
            expect(await lintDefault('function test(){return true;}')).toHaveRuleError('block-spacing');
        });
    });

    describe('capitalized-comments', () => {
        it('should enforce capitalized comments', async () => {
            expect(
                await lintDefault(dedent`
                    const fn = (x) => x; //an uncapitalized comment without a space before it
                    // This comment is valid since it has the correct capitalization.
                    // this comment is ignored since it follows another comment,
                    // and this one as well because it follows yet another comment.
                `)
            ).toHaveRuleWarning('capitalized-comments');
        });
    });

    describe('comma-spacing', () => {
        it('should enforce comma spacing', async () => {
            expect(
                await lintDefault(dedent`
                    const arr = [1,2,3];
                    const obj = {a:1,b:2};
                `)
            ).toHaveRuleError('comma-spacing');
        });
    });

    describe('key-spacing', () => {
        it('should enforce key spacing', async () => {
            expect(
                await lintDefault(dedent`
                    const fn = (x) => x;
                    fn({a:1});
                `)
            ).toHaveRuleWarning('key-spacing');
        });
    });

    describe('keyword-spacing', () => {
        it('should enforce keyword spacing', async () => {
            expect(await lintDefault('if(true){return;}')).toHaveRuleError('keyword-spacing');
        });
    });

    describe('no-multi-spaces', () => {
        it('should enforce no multiple spaces', async () => {
            expect(await lintDefault('const x = 1;  const y = 2;')).toHaveRuleError('no-multi-spaces');
        });
    });

    describe('no-multiple-empty-lines', () => {
        it('should throw error for multiple empty lines', async () => {
            expect(
                await lintDefault(dedent`
            const x = 1;


            const y = 2;`)
            ).toHaveRuleWarning('no-multiple-empty-lines');
        });
    });

    describe('object-curly-spacing', () => {
        it('should enforce object curly spacing', async () => {
            expect(
                await lintDefault(dedent`
                    const fn = (x) => x;
                    fn({a:1});
                `)
            ).toHaveRuleWarning('object-curly-spacing');
        });
    });

    describe('quote-props', () => {
        it('should enforce quote props as needed', async () => {
            expect(await lintDefault("const obj = {'prop': 1, 'valid-prop': 2};")).toHaveRuleWarning('quote-props');
        });
    });

    describe('quotes', () => {
        it('should enforce single quotes', async () => {
            expect(await lintDefault('const notUsed = "5";')).toHaveRuleError('quotes');
        });
    });

    describe('semi', () => {
        it('should enforce semicolons', async () => {
            expect(
                await lintDefault(dedent`
                    const x = 1
                    const y = 2
                `)
            ).toHaveRuleError('semi');
        });
    });

    describe('space-before-blocks', () => {
        it('should enforce space before blocks', async () => {
            expect(await lintDefault('function test(){return true;}')).toHaveRuleError('space-before-blocks');
        });
    });

    describe('space-in-parens', () => {
        it('should enforce no space in parens', async () => {
            expect(
                await lintDefault(dedent`
                    const result = ( 1 + 2 );
                    function test( x ) { return x; }
                `)
            ).toHaveRuleError('space-in-parens');
        });
    });

    describe('space-infix-ops', () => {
        it('should enforce space around infix operators', async () => {
            expect(
                await lintDefault(dedent`
                    const x = 1+2;
                    const y = 3*4;
                `)
            ).toHaveRuleError('space-infix-ops');
        });
    });

    describe('spaced-comment', () => {
        it('should enforce spaced comments', async () => {
            expect(
                await lintDefault('const fn = (x) => x; //an uncapitalized comment without a space before it')
            ).toHaveRuleError('spaced-comment');
        });
    });

    describe('no-unneeded-ternary', () => {
        it('should enforce no unneeded ternary', async () => {
            expect(await lintDefault('const value = x === 2 ? true : false;')).toHaveRuleError('no-unneeded-ternary');
        });
    });

    describe('no-use-before-define', () => {
        it('should enforce no use before define', async () => {
            expect(
                await lintDefault(dedent`
                    console.log(x);
                    const x = 5;
                `)
            ).toHaveRuleError('no-use-before-define');
        });
    });

    describe('no-restricted-syntax', () => {
        it('should throw error for numeric enum', async () => {
            expect(
                await lintDefault(dedent`
                    enum Status {
                        Active,
                        Inactive,
                    }
                `)
            ).toHaveRuleError('no-restricted-syntax');
        });

        it('should throw error for string enum', async () => {
            expect(
                await lintDefault(dedent`
                    enum Color {
                        Red = 'red',
                        Green = 'green',
                        Blue = 'blue',
                    }
                `)
            ).toHaveRuleError('no-restricted-syntax');
        });

        it('should throw error for const enum', async () => {
            expect(
                await lintDefault(dedent`
                    const enum Direction {
                        Up,
                        Down,
                        Left,
                        Right,
                    }
                `)
            ).toHaveRuleError('no-restricted-syntax');
        });

        it('should throw error for enum with mixed values', async () => {
            expect(
                await lintDefault(dedent`
                    enum Mixed {
                        First = 1,
                        Second = 'second',
                    }
                `)
            ).toHaveRuleError('no-restricted-syntax');
        });

        it('should not throw error for union type (alternative to enum)', async () => {
            expect(
                await lintDefault(dedent`
                    type Status = 'active' | 'inactive';
                `)
            ).toHaveNoRuleError('no-restricted-syntax');
        });

        it('should not throw error for const object (alternative to enum)', async () => {
            expect(
                await lintDefault(dedent`
                    const Status = {
                        Active: 'active',
                        Inactive: 'inactive',
                    } as const;
                `)
            ).toHaveNoRuleError('no-restricted-syntax');
        });

        it('should not throw error for regular code without enums', async () => {
            expect(
                await lintDefault(dedent`
                    function getStatus(): string {
                        return 'active';
                    }
                `)
            ).toHaveNoRuleError('no-restricted-syntax');
        });
    });

    describe('lines-between-class-members', () => {
        it('should enforce blank lines between class members', async () => {
            expect(
                await lintDefault(dedent`
                    class MyClass {
                        public methodOne() {
                            return 1;
                        }
                        public methodTwo() {
                            return 2;
                        }
                    }
                `)
            ).toHaveRuleError('lines-between-class-members');
        });

        it('should allow single-line members without blank line after', async () => {
            expect(
                await lintDefault(dedent`
                    class MyClass {
                        public prop = 1;
                        public method() {}
                    }
                `)
            ).toHaveNoRuleError('lines-between-class-members');
        });

        it('should enforce blank line between multi-line members', async () => {
            expect(
                await lintDefault(dedent`
                    class MyClass {
                        public methodOne() {
                            return 1;
                        }
                        public methodTwo() {
                            return 2;
                        }
                    }
                `)
            ).toHaveRuleError('lines-between-class-members');
        });

        it('should not throw error when blank lines are present', async () => {
            expect(
                await lintDefault(dedent`
                    class MyClass {
                        public prop = 1;

                        public methodOne() {
                            return 1;
                        }

                        public methodTwo() {
                            return 2;
                        }
                    }
                `)
            ).toHaveNoRuleError('lines-between-class-members');
        });
    });
});
