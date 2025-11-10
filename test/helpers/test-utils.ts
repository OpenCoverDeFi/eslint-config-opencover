import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, mkdirSync } from 'fs';
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


export const createESLintInstance = async (config: Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[]): Promise<ESLint> => {
	const configArray = Array.isArray(config) ? config : [config];

	const rootDir = resolve(__dirname, '../..');

	return new ESLint({
		overrideConfig: [
			...configArray,
			{
				languageOptions: {
					parserOptions: {
						projectService: {
							maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 1000000,
							allowDefaultProject: ['.temp/*.ts'], // for loading code for eslint to lint
						}
					},
				},
			},
		],
		cwd: rootDir,
		ignore: false,
	});
};
