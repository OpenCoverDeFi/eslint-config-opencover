import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

describe('eslint.configs.recommended rules', () => {
    it('should enforce no-async-promise-executor', async () => {
        const code = 'new Promise(async (resolve) => { resolve(1); });';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-async-promise-executor');
    });

    it('should enforce no-case-declarations', async () => {
        const code = dedent`
			switch (x) {
				case 1:
					const y = 1;
					break;
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-case-declarations');
    });

    it('should enforce no-compare-neg-zero', async () => {
        const code = 'if (x === -0) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-compare-neg-zero');
    });

    it('should enforce no-cond-assign', async () => {
        const code = 'if (x = 0) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-cond-assign');
    });

    it('should enforce no-constant-binary-expression', async () => {
        const code = 'const value1 = +x == null;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-constant-binary-expression');
    });

    it('should enforce no-constant-condition', async () => {
        const code = 'if (true) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-constant-condition');
    });

    it('should enforce no-control-regex', async () => {
        const code = 'const regex = /\\x1f/;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-control-regex');
    });

    it('should enforce no-debugger', async () => {
        const code = 'debugger;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-debugger');
    });

    it('should enforce no-delete-var', async () => {
        const code = 'const x = 1; delete x;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-delete-var');
    });

    it('should enforce no-dupe-else-if', async () => {
        const code = dedent`
			if (a) {}
			else if (a) {}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-dupe-else-if');
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
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-duplicate-case');
    });

    it('should enforce no-empty', async () => {
        const code = 'if (x) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-empty');
    });

    it('should enforce no-empty-character-class', async () => {
        const code = 'const regex = /[]/;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-empty-character-class');
    });

    it('should enforce no-empty-pattern', async () => {
        const code = 'const {} = obj;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-empty-pattern');
    });

    it('should enforce no-empty-static-block', async () => {
        const code = dedent`
			class A {
				static {}
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-empty-static-block');
    });

    it('should enforce no-ex-assign', async () => {
        const code = dedent`
			try {}
			catch (e) {
				e = 1;
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-ex-assign');
    });

    it('should enforce no-extra-boolean-cast', async () => {
        const code = 'if (!!x) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-extra-boolean-cast');
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
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-fallthrough');
    });

    it('should enforce no-global-assign', async () => {
        const code = 'Object = null;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-global-assign');
    });

    it('should enforce no-invalid-regexp', async () => {
        const code = 'new RegExp("[");';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-invalid-regexp');
    });

    it('should enforce no-irregular-whitespace', async () => {
        const code = 'const x = 1\u200B;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-irregular-whitespace');
    });

    it('should enforce no-loss-of-precision', async () => {
        const code = 'const x = 9007199254740993;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-loss-of-precision');
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
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-misleading-character-class');
    });

    // NOTE: this is a bug, even if you reenable it, it will still fail.
    // code is copied from eslint website
    it.skip('should enforce no-octal', async () => {
        const code = dedent`
			const num = 071;
			const result = 5 + 07;
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-octal');
    });

    it('should enforce no-prototype-builtins', async () => {
        const code = 'const hasOwn = obj.hasOwnProperty("prop");';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-prototype-builtins');
    });

    it('should enforce no-regex-spaces', async () => {
        const code = 'const regex = /foo   bar/;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-regex-spaces');
    });

    it('should enforce no-self-assign', async () => {
        const code = 'x = x;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-self-assign');
    });

    it('should enforce no-shadow-restricted-names', async () => {
        const code = 'const undefined = 1;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-shadow-restricted-names');
    });

    it('should enforce no-sparse-arrays', async () => {
        const code = 'const arr = [1,,2];';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-sparse-arrays');
    });

    it('should enforce no-unexpected-multiline', async () => {
        const code = dedent`
			const x = 1
			[1, 2, 3].forEach(() => {});
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-unexpected-multiline');
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
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-unsafe-finally');
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
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-unsafe-optional-chaining');
    });

    it('should enforce no-unused-labels', async () => {
        const code = 'label: while(true) { break; }';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-unused-labels');
    });

    it('should enforce no-unused-private-class-members', async () => {
        const code = dedent`
			class A {
				#unused() {}
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-unused-private-class-members');
    });

    it('should enforce no-useless-backreference', async () => {
        const code = 'const regex = /(\\1)/;';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-useless-backreference');
    });

    it('should enforce no-useless-catch', async () => {
        const code = dedent`
			try {
				throw new Error();
			} catch (e) {
				throw e;
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-useless-catch');
    });

    it('should enforce no-useless-escape', async () => {
        const code = 'const str = "\\a";';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-useless-escape');
    });

    it('should enforce require-yield', async () => {
        const code = 'function* gen() { return 1; }';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'require-yield');
    });

    it('should enforce use-isnan', async () => {
        const code = 'if (x == NaN) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'use-isnan');
    });

    it('should enforce valid-typeof', async () => {
        const code = 'if (typeof x === "strnig") {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'valid-typeof');
    });

    it('should enforce for-direction', async () => {
        const code = 'for (let i = 0; i < 10; i--) {}';
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'for-direction');
    });

    // NOTE: this is a bug, even if you reenable it, it will still fail.
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
        const [result] = await lintText(defaultConfig, code);
        expectRuleError(result, 'no-nonoctal-decimal-escape');
    });
});

describe('Rules disabled by typescript-eslint', () => {
    it('should not enforce no-array-constructor (replaced by @typescript-eslint/no-array-constructor)', async () => {
        const code = 'const arr = new Array(1, 2, 3);';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-array-constructor');
    });

    it('should not enforce no-unused-expressions (replaced by @typescript-eslint/no-unused-expressions)', async () => {
        const code = '1 + 1;';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-unused-expressions');
    });

    it('should not enforce no-unused-vars (replaced by @typescript-eslint/no-unused-vars)', async () => {
        const code = 'const unused = 1;';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-unused-vars');
    });

    it('should not enforce no-implied-eval (replaced by @typescript-eslint/no-implied-eval)', async () => {
        const code = 'setTimeout("alert(\'Hi!\');", 100);';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-implied-eval');
    });

    it('should not enforce no-throw-literal (replaced by @typescript-eslint/only-throw-error)', async () => {
        const code = dedent`
			throw "error";
			throw 0;
			throw false;
			throw null;
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-throw-literal');
    });

    it('should not enforce prefer-promise-reject-errors (replaced by @typescript-eslint/prefer-promise-reject-errors)', async () => {
        const code = 'Promise.reject("something bad happened");';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'prefer-promise-reject-errors');
    });

    it('should not enforce require-await (replaced by @typescript-eslint/require-await)', async () => {
        const code = 'async function foo() { return 1; }';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'require-await');
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
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'constructor-super');
    });

    it('should not enforce getter-return (handled by TypeScript)', async () => {
        const code = dedent`
			const obj = {
				get prop() {
					// Missing return
				}
			};
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'getter-return');
    });

    it('should not enforce no-class-assign (handled by TypeScript)', async () => {
        const code = dedent`
			class A {}
			A = 0;
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-class-assign');
    });

    it('should not enforce no-const-assign (handled by TypeScript)', async () => {
        const code = 'const x = 1; x = 2;';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-const-assign');
    });

    it('should not enforce no-dupe-args (handled by TypeScript)', async () => {
        const code = 'function foo(a, a) {}';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-dupe-args');
    });

    it('should not enforce no-dupe-class-members (handled by TypeScript)', async () => {
        const code = dedent`
			class A {
				foo() {}
				foo() {}
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-dupe-class-members');
    });

    it('should not enforce no-dupe-keys (handled by TypeScript)', async () => {
        const code = 'const obj = { a: 1, a: 2 };';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-dupe-keys');
    });

    it('should not enforce no-func-assign (handled by TypeScript)', async () => {
        const code = dedent`
			function foo() {}
			foo = 1;
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-func-assign');
    });

    it('should not enforce no-import-assign (handled by TypeScript)', async () => {
        const code = dedent`
			import mod from './mod';
			mod = 1;
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-import-assign');
    });
});

describe('Rules disabled by typescript-eslint (temporarily disabled for ESLint v8 compatibility, will be re-enabled after ESLint v8 support is dropped)', () => {
    it('should not enforce no-new-native-nonconstructor (handled by TypeScript)', async () => {
        const code = 'const x = new Symbol();';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-new-native-nonconstructor');
    });

    it('should not enforce no-new-symbol (handled by TypeScript)', async () => {
        const code = 'const x = new Symbol();';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-new-symbol');
    });

    it('should not enforce no-obj-calls (handled by TypeScript)', async () => {
        const code = 'const x = Math();';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-obj-calls');
    });

    it('should not enforce no-redeclare (handled by TypeScript)', async () => {
        const code = dedent`
			let x = 1;
			let x = 2;
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-redeclare');
    });

    it('should not enforce no-setter-return (handled by TypeScript)', async () => {
        const code = dedent`
			const obj = {
				set prop(value) {
					return value;
				}
			};
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-setter-return');
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
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-this-before-super');
    });

    it('should not enforce no-undef (handled by TypeScript)', async () => {
        const code = 'const x = undefinedVariable;';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-undef');
    });

    it('should not enforce no-unreachable (handled by TypeScript)', async () => {
        const code = dedent`
			function foo() {
				return 1;
				return 2;
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-unreachable');
    });

    it('should not enforce no-unsafe-negation (handled by TypeScript)', async () => {
        const code = 'if (!x in obj) {}';
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-unsafe-negation');
    });

    it('should not enforce no-with (handled by TypeScript)', async () => {
        const code = dedent`
			with (obj) {
				prop = 1;
			}
		`;
        const [result] = await lintText(defaultConfig, code);
        expectNoRuleError(result, 'no-with');
    });
});
