import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('import/order', () => {
    it('allows node: imports before external', () => {
        const messages = lint(["import fs from 'node:fs';", "import path from 'node:path';"].join('\n'), 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'import/order')).toHaveLength(0);
    });

    it('requires node: imports before external', () => {
        const messages = lint(["import express from 'express';", "import fs from 'node:fs';"].join('\n'), 'test.ts');

        expect(messages.some((m) => m.ruleId === 'import/order')).toBe(true);
    });
});
