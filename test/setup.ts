import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import type { RulesConfig } from '@eslint/core';
import { ESLint, Linter } from 'eslint';
import { afterAll, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const tempDir = resolve(__dirname, '../.temp');

let tempFilePath: string | null = null;

export const createTempFile = (content: string, suffix: string): string => {
	try {
		mkdirSync(tempDir, { recursive: true });
	} catch {
		// Ignore
	}
	const timestamp = Date.now();
	const randomId = Math.random().toString(36).substring(7);
	const filePath = join(tempDir, `temp-${timestamp}-${randomId}.${suffix}`);

	writeFileSync(filePath, content, 'utf8');
	return filePath;
};

export const createESLintInstance = (config: Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[]): ESLint => {
	const configArray = Array.isArray(config) ? config : [config];
	const rootDir = resolve(__dirname, '..');

	return new ESLint({
		overrideConfigFile: true,
		overrideConfig: [
			...configArray,
			{
				languageOptions: {
					parserOptions: {
						projectService: {
							allowDefaultProject: ['.temp/*.ts'],
						},
					},
				},
			},
		],
		cwd: rootDir,
		ignore: false,
	});
};

export const lintText = async (config: Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[], code: string) => {
	if (!tempFilePath) {
		tempFilePath = createTempFile('', 'ts');
	}

	const linter = createESLintInstance(config);

	return await linter.lintText(code, {
		filePath: tempFilePath, // We need to pass this for our opencover-eslint-no-unnecessary-optional-chain rule to work
	});
};

export const expectRuleError = (result: ESLint.LintResult, ruleId: string) => {
	expect(result.errorCount).toBeGreaterThan(0);
	expect(result.messages).toContainEqual(expect.objectContaining({ ruleId }));
};

export const expectRuleWarning = (result: ESLint.LintResult, ruleId: string) => {
	expect(result.warningCount).toBeGreaterThan(0);
	expect(result.messages).toContainEqual(expect.objectContaining({ ruleId }));
};

afterAll(() => {
	try {
		rmSync(tempDir, { recursive: true, force: true });
	} catch {
		// Ignore cleanup errors
	}
});
