import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('import-x/prefer-default-export', () => {
    it('does not warn on named exports', () => {
        const messages = lint('export const a = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'import-x/prefer-default-export')).toHaveLength(0);
    });
});

describe('import-x/order', () => {
    it('allows node: imports before external', () => {
        const messages = lint(["import fs from 'node:fs';", "import path from 'node:path';"].join('\n'), 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(0);
    });

    it('requires node: imports before external', () => {
        const messages = lint(["import express from 'express';", "import fs from 'node:fs';"].join('\n'), 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(1);
    });
});
