import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintWithDefaultConfig } from '@tests/test-utils.js';

describe('eslint.configs.recommended rules', () => {
    it('should enforce no-async-promise-executor', async () => {
        const code = 'new Promise(async (resolve) => { resolve(1); });';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-async-promise-executor');
    });

    it('should enforce no-case-declarations', async () => {
        const code = dedent`
            switch (x) {
                case 1:
                    const y = 1;
                    break;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-case-declarations');
    });

    it('should enforce no-compare-neg-zero', async () => {
        const code = 'if (x === -0) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-compare-neg-zero');
    });

    it('should enforce no-cond-assign', async () => {
        const code = 'if (x = 0) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-cond-assign');
    });

    it('should enforce no-constant-binary-expression', async () => {
        const code = 'const value1 = +x == null;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-constant-binary-expression');
    });

    it('should enforce no-constant-condition', async () => {
        const code = 'if (true) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-constant-condition');
    });

    it('should enforce no-control-regex', async () => {
        const code = 'const regex = /\\x1f/;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-control-regex');
    });

    it('should enforce no-debugger', async () => {
        const code = 'debugger;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-debugger');
    });

    it('should enforce no-delete-var', async () => {
        const code = 'const x = 1; delete x;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-delete-var');
    });

    it('should enforce no-dupe-else-if', async () => {
        const code = dedent`
            if (a) {}
            else if (a) {}
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-dupe-else-if');
    });

    it('should enforce no-duplicate-case', async () => {
        const code = dedent`
            switch (x) {
                case 1:
                    break;
                case 1:
                    break;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-duplicate-case');
    });

    it('should enforce no-empty', async () => {
        const code = 'if (x) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-empty');
    });

    it('should enforce no-empty-character-class', async () => {
        const code = 'const regex = /[]/;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-empty-character-class');
    });

    it('should enforce no-empty-pattern', async () => {
        const code = 'const {} = obj;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-empty-pattern');
    });

    it('should enforce no-empty-static-block', async () => {
        const code = dedent`
            class A {
                static {}
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-empty-static-block');
    });

    it('should enforce no-ex-assign', async () => {
        const code = dedent`
            try {}
            catch (e) {
                e = 1;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-ex-assign');
    });

    it('should enforce no-extra-boolean-cast', async () => {
        const code = 'if (!!x) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-extra-boolean-cast');
    });

    it('should enforce no-fallthrough', async () => {
        const code = dedent`
            switch(foo) {
                case 1:
                    doSomething();

                case 2:
                    doSomething();
            }

        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-fallthrough');
    });

    it('should enforce no-global-assign', async () => {
        const code = 'Object = null;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-global-assign');
    });

    it('should enforce no-invalid-regexp', async () => {
        const code = 'new RegExp("[");';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-invalid-regexp');
    });

    it('should enforce no-irregular-whitespace', async () => {
        const code = 'const x = 1\u200B;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-irregular-whitespace');
    });

    it('should enforce no-loss-of-precision', async () => {
        const code = 'const x = 9007199254740993;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-loss-of-precision');
    });

    it('should enforce no-misleading-character-class', async () => {
        const code = dedent`
            /^[Á]$/u;
            /^[❇️]$/u;
            /^[👶🏻]$/u;
            /^[🇯🇵]$/u;
            /^[👨‍👩‍👦]$/u;
            /^[👍]$/;
            new RegExp("[🎵]");
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-misleading-character-class');
    });

    // NOTE (@eniko1556, 2025-11-19): this is a bug, even if you reenable it, it will still fail.
    // code is copied from eslint website
    it.skip('should enforce no-octal', async () => {
        const code = dedent`
            const num = 071;
            const result = 5 + 07;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-octal');
    });

    it('should enforce no-prototype-builtins', async () => {
        const code = 'const hasOwn = obj.hasOwnProperty("prop");';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-prototype-builtins');
    });

    it('should enforce no-regex-spaces', async () => {
        const code = 'const regex = /foo   bar/;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-regex-spaces');
    });

    it('should enforce no-self-assign', async () => {
        const code = 'x = x;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-self-assign');
    });

    it('should enforce no-shadow-restricted-names', async () => {
        const code = 'const undefined = 1;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-shadow-restricted-names');
    });

    it('should enforce no-sparse-arrays', async () => {
        const code = 'const arr = [1,,2];';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-sparse-arrays');
    });

    it('should enforce no-unexpected-multiline', async () => {
        const code = dedent`
            const x = 1
            [1, 2, 3].forEach(() => {});
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-unexpected-multiline');
    });

    it('should enforce no-unsafe-finally', async () => {
        const code = dedent`
            let foo = function() {
                try {
                    return 1;
                } catch(err) {
                    return 2;
                } finally {
                    return 3;
                }
            };

        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-unsafe-finally');
    });

    it('should enforce no-unsafe-optional-chaining', async () => {
        const code = dedent`
            (obj?.foo)();
            (obj?.foo).bar;
            (foo?.()).bar;
            (foo?.()).bar();
            (obj?.foo ?? obj?.bar)();
            (foo || obj?.foo)();
            (obj?.foo && foo)();
            (foo ? obj?.foo : bar)();
            (foo, obj?.bar).baz;
            (obj?.foo)\`template\`;
            new (obj?.foo)();
            [...obj?.foo];
            bar(...obj?.foo);
            1 in obj?.foo;
            bar instanceof obj?.foo;
            for (bar of obj?.foo);
            const { bar } = obj?.foo;
            [{ bar } = obj?.foo] = [];
            with (obj?.foo);
            class A extends obj?.foo {}
            const a = class A extends obj?.foo {};
            async function foo () {
                const { bar } = await obj?.foo;
               (await obj?.foo)();
               (await obj?.foo).bar;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-unsafe-optional-chaining');
    });

    it('should enforce no-unused-labels', async () => {
        const code = 'label: while(true) { break; }';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-unused-labels');
    });

    it('should enforce no-unused-private-class-members', async () => {
        const code = dedent`
            class A {
                #unused() {}
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-unused-private-class-members');
    });

    it('should enforce no-useless-backreference', async () => {
        const code = 'const regex = /(\\1)/;';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-useless-backreference');
    });

    it('should enforce no-useless-catch', async () => {
        const code = dedent`
            try {
                throw new Error();
            } catch (e) {
                throw e;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-useless-catch');
    });

    it('should enforce no-useless-escape', async () => {
        const code = 'const str = "\\a";';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-useless-escape');
    });

    it('should enforce require-yield', async () => {
        const code = 'function* gen() { return 1; }';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('require-yield');
    });

    it('should enforce use-isnan', async () => {
        const code = 'if (x == NaN) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('use-isnan');
    });

    it('should enforce valid-typeof', async () => {
        const code = 'if (typeof x === "strnig") {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('valid-typeof');
    });

    it('should enforce for-direction', async () => {
        const code = 'for (let i = 0; i < 10; i--) {}';
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('for-direction');
    });

    // TODO (@eniko1556, 2025-11-19): this is a bug, even if you reenable it, it will still fail.
    // code is copied from eslint website
    it.skip('should enforce no-nonoctal-decimal-escape', async () => {
        const code = dedent`
            "\\8";
            "\\9";
            const foo = "w\\8less";
            const bar = "December 1\\9";
            const baz = "Don't use \\8 and \\9 escapes.";
            const quux = "\\0\\8";
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError('no-nonoctal-decimal-escape');
    });
});

describe('Rules disabled by typescript-eslint', () => {
    it('should not enforce no-array-constructor (replaced by @typescript-eslint/no-array-constructor)', async () => {
        const code = 'const arr = new Array(1, 2, 3);';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-array-constructor');
    });

    it('should not enforce no-unused-expressions (replaced by @typescript-eslint/no-unused-expressions)', async () => {
        const code = '1 + 1;';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-unused-expressions');
    });

    it('should not enforce no-unused-vars (replaced by @typescript-eslint/no-unused-vars)', async () => {
        const code = 'const unused = 1;';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-unused-vars');
    });

    it('should not enforce no-implied-eval (replaced by @typescript-eslint/no-implied-eval)', async () => {
        const code = 'setTimeout("alert(\'Hi!\');", 100);';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-implied-eval');
    });

    it('should not enforce no-throw-literal (replaced by @typescript-eslint/only-throw-error)', async () => {
        const code = dedent`
            throw "error";
            throw 0;
            throw false;
            throw null;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-throw-literal');
    });

    it('should not enforce prefer-promise-reject-errors (replaced by @typescript-eslint/prefer-promise-reject-errors)', async () => {
        const code = 'Promise.reject("something bad happened");';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('prefer-promise-reject-errors');
    });

    it('should not enforce require-await (replaced by @typescript-eslint/require-await)', async () => {
        const code = 'async function foo() { return 1; }';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('require-await');
    });

    it('should not enforce constructor-super (handled by TypeScript)', async () => {
        const code = dedent`
            class A {}
            class B extends A {
                constructor() {
                    // Missing super() call
                }
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('constructor-super');
    });

    it('should not enforce getter-return (handled by TypeScript)', async () => {
        const code = dedent`
            const obj = {
                get prop() {
                    // Missing return
                }
            };
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('getter-return');
    });

    it('should not enforce no-class-assign (handled by TypeScript)', async () => {
        const code = dedent`
            class A {}
            A = 0;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-class-assign');
    });

    it('should not enforce no-const-assign (handled by TypeScript)', async () => {
        const code = 'const x = 1; x = 2;';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-const-assign');
    });

    it('should not enforce no-dupe-args (handled by TypeScript)', async () => {
        const code = 'function foo(a, a) {}';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-dupe-args');
    });

    it('should not enforce no-dupe-class-members (handled by TypeScript)', async () => {
        const code = dedent`
            class A {
                foo() {}
                foo() {}
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-dupe-class-members');
    });

    it('should not enforce no-dupe-keys (handled by TypeScript)', async () => {
        const code = 'const obj = { a: 1, a: 2 };';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-dupe-keys');
    });

    it('should not enforce no-func-assign (handled by TypeScript)', async () => {
        const code = dedent`
            function foo() {}
            foo = 1;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-func-assign');
    });

    it('should not enforce no-import-assign (handled by TypeScript)', async () => {
        const code = dedent`
            import mod from './mod';
            mod = 1;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-import-assign');
    });
});

describe('Rules disabled by typescript-eslint (temporarily disabled for ESLint v8 compatibility, will be re-enabled after ESLint v8 support is dropped)', () => {
    it('should not enforce no-new-native-nonconstructor (handled by TypeScript)', async () => {
        const code = 'const x = new Symbol();';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-new-native-nonconstructor');
    });

    it('should not enforce no-new-symbol (handled by TypeScript)', async () => {
        const code = 'const x = new Symbol();';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-new-symbol');
    });

    it('should not enforce no-obj-calls (handled by TypeScript)', async () => {
        const code = 'const x = Math();';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-obj-calls');
    });

    it('should not enforce no-redeclare (handled by TypeScript)', async () => {
        const code = dedent`
            let x = 1;
            let x = 2;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-redeclare');
    });

    it('should not enforce no-setter-return (handled by TypeScript)', async () => {
        const code = dedent`
            const obj = {
                set prop(value) {
                    return value;
                }
            };
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-setter-return');
    });

    it('should not enforce no-this-before-super (handled by TypeScript)', async () => {
        const code = dedent`
            class A {}
            class B extends A {
                constructor() {
                    this.x = 1;
                    super();
                }
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-this-before-super');
    });

    it('should not enforce no-undef (handled by TypeScript)', async () => {
        const code = 'const x = undefinedVariable;';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-undef');
    });

    it('should not enforce no-unreachable (handled by TypeScript)', async () => {
        const code = dedent`
            function foo() {
                return 1;
                return 2;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-unreachable');
    });

    it('should not enforce no-unsafe-negation (handled by TypeScript)', async () => {
        const code = 'if (!x in obj) {}';
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-unsafe-negation');
    });

    it('should not enforce no-with (handled by TypeScript)', async () => {
        const code = dedent`
            with (obj) {
                prop = 1;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError('no-with');
    });
});
