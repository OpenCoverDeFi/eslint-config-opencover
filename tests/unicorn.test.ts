import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('unicorn/no-array-callback-reference', () => {
    it('allows inline arrow functions', () => {
        const messages = lint('const result = arr.filter((x) => isValid(x));', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/no-array-callback-reference')).toHaveLength(0);
    });

    it('allows builtin Boolean reference', () => {
        const messages = lint('const result = arr.filter(Boolean);', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/no-array-callback-reference')).toHaveLength(0);
    });

    it('bans user-defined function passed directly', () => {
        const messages = lint('const result = arr.filter(isValid);', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/no-array-callback-reference')).toHaveLength(1);
    });
});

describe('unicorn/filename-case', () => {
    it('allows kebab-case filenames', () => {
        const messages = lint('// Ok', 'my-component.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/filename-case')).toHaveLength(0);
    });

    it('bans PascalCase filenames', () => {
        const messages = lint('// Ok', 'MyComponent.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/filename-case')).toHaveLength(1);
    });
});

describe('unicorn/prefer-node-protocol', () => {
    it('requires node: protocol for builtins', () => {
        const messages = lint("import fs from 'fs';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/prefer-node-protocol')).toHaveLength(1);
    });

    it('allows node: protocol', () => {
        const messages = lint("import fs from 'node:fs';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'unicorn/prefer-node-protocol')).toHaveLength(0);
    });
});
