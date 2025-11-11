import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import type { RulesConfig } from '@eslint/core';
import type { Linter } from 'eslint';
import { ESLint } from 'eslint';
import { afterAll, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const tempDir = resolve(__dirname, '../.temp');

let tempFilePath: string | null = null;
type Config = Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[];

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

export const createTempFileWithName = (content: string, filename: string): string => {
	const filePath = join(tempDir, filename);
	const fileDir = dirname(filePath);

	try {
		mkdirSync(fileDir, { recursive: true });
	} catch {
		// Ignore
	}

	writeFileSync(filePath, content, 'utf8');
	return filePath;
};
export const createESLintInstance = (config: Config): ESLint => {
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
							allowDefaultProject: ['.temp/*.ts', '.temp/*.test.ts'],
							maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 10000,
						},
					},
				},
			},
		],
		cwd: rootDir,
		ignore: false,
	});
};

export const lintFile = async (config: Config, filePath: string): Promise<ESLint.LintResult[]> => {
	const linter = createESLintInstance(config);
	return await linter.lintFiles([filePath]);
};

export const lintFileWithName = async (
	config: Config,
	filePath: string,
	code: string
): Promise<ESLint.LintResult[]> => {
	const linter = createESLintInstance(config);

	return await linter.lintText(code, {
		filePath, // We need to pass this for test rules to work
	});
};

export const lintText = async (config: Config, code: string) => {
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

export const expectNoRuleError = (result: ESLint.LintResult, ruleId: string) => {
	expect(result.messages).not.toContainEqual(expect.objectContaining({ ruleId }));
};

afterAll(() => {
	try {
		rmSync(tempDir, { recursive: true, force: true });
	} catch {
		// Ignore cleanup errors
	}
});
