import { mkdirSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const tempDir = resolve(__dirname, '../.dist');

export function setup() {
    try {
        mkdirSync(tempDir, { recursive: true });
    } catch {
        // Ignore cleanup errors
    }
}

export function teardown() {
    try {
        rmSync(tempDir, { recursive: true, force: true });
    } catch {
        // Ignore cleanup errors
    }
}
