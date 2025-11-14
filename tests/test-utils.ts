import { resolve, dirname, join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import type { RulesConfig } from '@eslint/core';
import type { Linter } from 'eslint';
import { ESLint } from 'eslint';
import { expect } from 'vitest';
import { tempDir } from './global-setup.js';

let tempFilePath: string | null = null;
type Config = Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[];

export const createTempFile = (filename: string): string => {
    const filePath = join(tempDir, filename);
    const fileDir = dirname(filePath);

    try {
        mkdirSync(fileDir, { recursive: true });
    } catch {
        // Ignore
    }

    writeFileSync(filePath, '', 'utf8');
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
                            allowDefaultProject: ['.temp/*.ts', '.temp/*.tsx', '.temp/*.test.ts'],
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

export const lintFile = async (config: Config, filePath: string): Promise<ESLint.LintResult> => {
    const linter = createESLintInstance(config);
    const results = await linter.lintFiles([filePath]);
    return results[0];
};

export const lintFileWithName = async (config: Config, filePath: string, code: string): Promise<ESLint.LintResult> => {
    const linter = createESLintInstance(config);

    const results = await linter.lintText(code, {
        filePath, // We need to pass this for test rules to work
    });

    return results[0];
};

export const lintText = async (config: Config, code: string): Promise<ESLint.LintResult> => {
    if (!tempFilePath) {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const filename = `temp-${timestamp}-${randomId}.ts`;
        tempFilePath = createTempFile(filename);
    }

    return await lintFileWithName(config, tempFilePath, code);
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
