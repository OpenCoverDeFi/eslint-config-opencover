import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault } from '@tests/test-utils.js';

describe('typescript-eslint.configs.recommendedTypeChecked rules', () => {
    it('should enforce @typescript-eslint/await-thenable', async () => {
        const code = 'await 123;';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/await-thenable');
    });

    it('should enforce @typescript-eslint/ban-ts-comment', async () => {
        const code = dedent`
            // @ts-ignore
            const x = 1;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/ban-ts-comment');
    });

    it('should enforce @typescript-eslint/no-array-constructor', async () => {
        const code = 'const arr = new Array(1, 2, 3);';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-array-constructor');
    });

    it('should enforce @typescript-eslint/no-array-delete', async () => {
        const code = 'const arr = [1, 2, 3]; delete arr[0];';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-array-delete');
    });

    it('should enforce @typescript-eslint/no-base-to-string', async () => {
        const code = dedent`
            const obj = {};
            const str = String(obj);
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-base-to-string');
    });

    it('should enforce @typescript-eslint/no-duplicate-enum-values', async () => {
        const code = dedent`
            enum Test {
                A = 1,
                B = 1,
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-duplicate-enum-values');
    });

    it('should enforce @typescript-eslint/no-duplicate-type-constituents', async () => {
        const code = dedent`
            type Test = string | number | string;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-duplicate-type-constituents');
    });

    it('should enforce @typescript-eslint/no-empty-object-type', async () => {
        const code = dedent`
            type Empty = {};
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-empty-object-type');
    });

    it('should enforce @typescript-eslint/no-explicit-any', async () => {
        const code = 'const x: any = 1;';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-explicit-any');
    });

    it('should enforce @typescript-eslint/no-extra-non-null-assertion', async () => {
        const code = 'const x = obj!!.prop;';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-extra-non-null-assertion');
    });

    it('should enforce @typescript-eslint/no-floating-promises', async () => {
        const code = 'Promise.resolve();';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-floating-promises');
    });

    it('should enforce @typescript-eslint/no-for-in-array', async () => {
        const code = dedent`
            const arr = [1, 2, 3];
            for (const key in arr) {}
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-for-in-array');
    });

    it('should enforce @typescript-eslint/no-implied-eval', async () => {
        const code = 'setTimeout("console.log(1)", 100);';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-implied-eval');
    });

    it('should enforce @typescript-eslint/no-misused-new', async () => {
        const code = dedent`
            declare class C {
              new(): C;
            }

            interface I {
              new (): I;
              constructor(): void;
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-misused-new');
    });

    it('should enforce @typescript-eslint/no-misused-promises', async () => {
        const code = dedent`
            const promise = Promise.resolve();
            if (promise) {}
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-misused-promises');
    });

    it('should enforce @typescript-eslint/no-namespace', async () => {
        const code = dedent`
            namespace Test {
                export const x = 1;
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-namespace');
    });

    it('should enforce @typescript-eslint/no-non-null-asserted-optional-chain', async () => {
        const code = 'const x = obj?.prop!;';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-non-null-asserted-optional-chain');
    });

    it('should enforce @typescript-eslint/no-redundant-type-constituents', async () => {
        const code = dedent`
            type UnionAny = any | 'foo';
            type UnionUnknown = unknown | 'foo';
            type UnionNever = never | 'foo';

            type UnionBooleanLiteral = boolean | false;
            type UnionNumberLiteral = number | 1;
            type UnionStringLiteral = string | 'foo';

            type IntersectionAny = any & 'foo';
            type IntersectionUnknown = string & unknown;
            type IntersectionNever = string | never;

            type IntersectionBooleanLiteral = boolean & false;
            type IntersectionNumberLiteral = number & 1;
            type IntersectionStringLiteral = string & 'foo';
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-redundant-type-constituents');
    });

    it('should enforce @typescript-eslint/no-require-imports', async () => {
        const code = 'const fs = require("fs");';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-require-imports');
    });

    it('should enforce @typescript-eslint/no-this-alias', async () => {
        const code = dedent`
            class Test {
                method() {
                    const self = this;
                }
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-this-alias');
    });

    it('should enforce @typescript-eslint/no-unnecessary-type-assertion', async () => {
        const code = dedent`
            const x: number = 1;
            const y = x as number;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unnecessary-type-assertion');
    });

    it('should enforce @typescript-eslint/no-unnecessary-type-constraint', async () => {
        const code = dedent`
            function test<T extends unknown>() {}
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unnecessary-type-constraint');
    });

    it('should enforce @typescript-eslint/no-unsafe-argument', async () => {
        const code = dedent`
            declare function foo(arg1: string, arg2: number, arg3: string): void;

            const anyTyped = 1 as any;

            foo(...anyTyped);
            foo(anyTyped, 1, 'a');

            const anyArray: any[] = [];
            foo(...anyArray);

            const tuple1 = ['a', anyTyped, 'b'] as const;
            foo(...tuple1);

            const tuple2 = [1] as const;
            foo('a', ...tuple2, anyTyped);

            declare function bar(arg1: string, arg2: number, ...rest: string[]): void;
            const x = [1, 2] as [number, ...number[]];
            bar('a', ...x, anyTyped);

            declare function baz(arg1: Set<string>, arg2: Map<string, string>): void;
            baz(new Set<any>(), new Map<any, string>());
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-argument');
    });

    // TODO (@eniko1556, 2025-11-20): Fix this, broke with refactor
    it.skip('should enforce @typescript-eslint/no-unsafe-assignment', async () => {
        const code = dedent`
            const x = 1 as any,
              y = 1 as any;
            const [x] = 1 as any;
            const [x] = [] as any[];
            const [x] = [1 as any];
            [x] = [1] as [any];

            function foo(a = 1 as any) {}
            class Foo {
              constructor(private a = 1 as any) {}
            }
            class Foo {
              private a = 1 as any;
            }

            // generic position examples
            const x: Set<string> = new Set<any>();
            const x: Map<string, string> = new Map<string, any>();
            const x: Set<string[]> = new Set<any[]>();
            const x: Set<Set<Set<string>>> = new Set<Set<Set<any>>>();
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-assignment');
    });

    it('should enforce @typescript-eslint/no-unsafe-call', async () => {
        const code = dedent`
            declare const anyVar: any;
            declare const nestedAny: { prop: any };

            anyVar();
            anyVar.a.b();

            nestedAny.prop();
            nestedAny.prop['a']();

            new anyVar();
            new nestedAny.prop();

            anyVar\`foo\`;
            nestedAny.prop\`foo\`;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-call');
    });

    it('should enforce @typescript-eslint/no-unsafe-declaration-merging', async () => {
        const code = dedent`
            interface Test {}
            class Test {}
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-declaration-merging');
    });

    it('should enforce @typescript-eslint/no-unsafe-enum-comparison', async () => {
        const code = dedent`
            enum Test {
                A = 1,
            }
            const x = Test.A === 1;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-enum-comparison');
    });

    it('should enforce @typescript-eslint/no-unsafe-function-type', async () => {
        const code = dedent`
            let noParametersOrReturn: Function;
            noParametersOrReturn = () => {};

            let stringToNumber: Function;
            stringToNumber = (text: string) => text.length;

            let identity: Function;
            identity = value => value;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-function-type');
    });

    it('should enforce @typescript-eslint/no-unsafe-member-access', async () => {
        const code = dedent`
            declare const anyVar: any;
            declare const nestedAny: { prop: any };

            anyVar.a;
            anyVar.a.b;
            anyVar['a'];
            anyVar['a']['b'];

            nestedAny.prop.a;
            nestedAny.prop['a'];

            const key = 'a';
            nestedAny.prop[key];

            // Using an any to access a member is unsafe
            const arr = [1, 2, 3];
            arr[anyVar];
            nestedAny[anyVar];
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-member-access');
    });

    it('should enforce @typescript-eslint/no-unsafe-return', async () => {
        const code = dedent`
            function foo1() {
              return 1 as any;
            }
            function foo2() {
              return Object.create(null);
            }
            const foo3 = () => {
              return 1 as any;
            };
            const foo4 = () => Object.create(null);

            function foo5() {
              return [] as any[];
            }
            function foo6() {
              return [] as Array<any>;
            }
            function foo7() {
              return [] as readonly any[];
            }
            function foo8() {
              return [] as Readonly<any[]>;
            }
            const foo9 = () => {
              return [] as any[];
            };
            const foo10 = () => [] as any[];

            const foo11 = (): string[] => [1, 2, 3] as any[];

            async function foo13() {
              return Promise.resolve({} as any);
            }

            // generic position examples
            function assignability1(): Set<string> {
              return new Set<any>([1]);
            }
            type TAssign = () => Set<string>;
            const assignability2: TAssign = () => new Set<any>([true]);
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-return');
    });

    it('should enforce @typescript-eslint/no-unsafe-unary-minus', async () => {
        const code = dedent`
            const value: unknown = 5;
            const x = -value;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-unary-minus');
    });

    it('should enforce @typescript-eslint/no-unused-expressions', async () => {
        const code = '1 + 1;';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unused-expressions');
    });

    it('should enforce @typescript-eslint/no-unused-vars', async () => {
        const code = 'const unused = 1;';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unused-vars');
    });

    it('should ignore unused vars starting with underscore in @typescript-eslint/no-unused-vars', async () => {
        const code = 'const _unused = 1;';
        expect(await lintDefault(code)).toHaveNoRuleError('@typescript-eslint/no-unused-vars');
    });

    it('should enforce @typescript-eslint/no-wrapper-object-types', async () => {
        const code = 'const x: String = "test";';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-wrapper-object-types');
    });

    it('should enforce @typescript-eslint/only-throw-error', async () => {
        const code = dedent`
            throw "error";
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/only-throw-error');
    });

    it('should enforce @typescript-eslint/prefer-as-const', async () => {
        const code = dedent`
            const x = "test" as "test";
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/prefer-as-const');
    });

    it('should enforce @typescript-eslint/prefer-namespace-keyword', async () => {
        const code = dedent`
            module Test {
                export const x = 1;
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/prefer-namespace-keyword');
    });

    it('should enforce @typescript-eslint/prefer-promise-reject-errors', async () => {
        const code = 'Promise.reject("error");';
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/prefer-promise-reject-errors');
    });

    it('should enforce @typescript-eslint/require-await', async () => {
        const code = dedent`
            async function test() {
                return 1;
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/require-await');
    });

    it('should enforce @typescript-eslint/restrict-plus-operands', async () => {
        const code = dedent`
            let foo = 1n + 1;
            let fn = (a: string, b: never) => a + b;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/restrict-plus-operands');
    });

    it('should enforce @typescript-eslint/restrict-template-expressions', async () => {
        const code = dedent`
            const x: unknown = "test";
            const y = \`value: \${x}\`;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/restrict-template-expressions');
    });

    it('should enforce @typescript-eslint/triple-slash-reference', async () => {
        const code = dedent`
            /// <reference path="test.ts" />
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/triple-slash-reference');
    });

    it('should enforce @typescript-eslint/unbound-method', async () => {
        const code = dedent`
            class A {
                method() {}
            }
            const instance = new A();
            const fn = instance.method;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/unbound-method');
    });
});
