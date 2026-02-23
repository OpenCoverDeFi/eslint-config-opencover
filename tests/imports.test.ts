import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { imports } from '@/configs/imports.js';

/**
 * Tests for the imports config layer.
 * Rules are pulled from the imports config's plugin reference.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': { node: true },
    },
});

const importPlugin = (imports[0].plugins ?? {})['import'];
const rules = imports[0].rules ?? {};

function opts(entry: unknown): unknown[] {
    return Array.isArray(entry) ? entry.slice(1) : [];
}

describe('imports config rules', () => {
    it('import/order: warns on unordered imports', () => {
        tester.run('import/order', importPlugin.rules['order'], {
            valid: [
                {
                    code: ["import fs from 'node:fs';", "import path from 'node:path';"].join('\n'),
                    options: opts(rules['import/order']),
                },
            ],
            invalid: [
                {
                    code: ["import express from 'express';", "import fs from 'node:fs';"].join('\n'),
                    options: opts(rules['import/order']),
                    output: ["import fs from 'node:fs';", "import express from 'express';", ''].join('\n'),
                    errors: [{ message: '`node:fs` import should occur before import of `express`' }],
                },
            ],
        });
    });

    it('import/prefer-default-export: is off — sole named export is allowed', () => {
        tester.run('import/prefer-default-export', importPlugin.rules['prefer-default-export'], {
            valid: [{ code: 'export const foo = 1; export const bar = 2;' }],
            invalid: [],
        });
    });
});
