import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, unlinkSync, mkdirSync } from 'fs';
import type { RulesConfig } from '@eslint/core';
import { ESLint, Linter } from 'eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const tempDir = resolve(__dirname, '../../.temp');

// Ensure temp directory exists
try {
	mkdirSync(tempDir, { recursive: true });
} catch {
	// Directory might already exist, ignore
}

// Track temp files for automatic cleanup
const tempFiles = new Set<string>();

export const createTempFile = (content: string, suffix: string): string => {
	const filePath = join(tempDir, `temp-${Date.now()}-${Math.random().toString(36).substring(7)}.${suffix}`);
	writeFileSync(filePath, content, 'utf8');
	tempFiles.add(filePath);
	return filePath;
};

export const cleanupTempFile = (filePath: string): void => {
	try {
		unlinkSync(filePath);
		tempFiles.delete(filePath);
	} catch {
		// Ignore cleanup errors
	}
};

export const cleanupAllTempFiles = (): void => {
	for (const filePath of tempFiles) {
		try {
			unlinkSync(filePath);
		} catch {
			// Ignore cleanup errors
		}
	}
	tempFiles.clear();
};

type ConfigModule = {
	default: Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[];
};

const isConfigModule = (value: unknown): value is ConfigModule => {
	return isObject(value) && 'default' in value && (typeof value.default === 'object' || Array.isArray(value.default));
};

export const createESLintInstance = async (configPath: string): Promise<ESLint> => {
	const importedModule: unknown = await import(configPath);
	if (!isConfigModule(importedModule)) {
		throw new Error(`Invalid config module: ${configPath}`);
	}
	const workspaceRoot = resolve(__dirname, '../..');

	return new ESLint({
		overrideConfig: importedModule.default,
		cwd: workspaceRoot,
	});
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
	value !== null && typeof value === 'object' && value.constructor === Object;
