import { dirname, join, resolve } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import type { RulesConfig } from '@eslint/core';
import type { Linter } from 'eslint';
import { ESLint } from 'eslint';
import { tempDir } from './global-setup.js';
import defaultConfig from '@/index.js';
import reactConfig from '@/react.js';

type Config = Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[];

const __filename = resolve(process.cwd(), 'src', 'index.ts');

const DEFAULT_PROJECT_SERVICE_CONFIG = {
    languageOptions: {
        parserOptions: {
            projectService: {
                // NOTE (@eniko1556, 2025-11-19): we need this as we need to create files
                // For typescript with projectService: true requires files to be created
                allowDefaultProject: ['.dist/*.ts', '.dist/*.tsx', '.dist/*.test.ts'],
                maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 10000,
            },
        },
    },
} as const satisfies Linter.Config<RulesConfig>;

function createESLintInstance(config: Config): ESLint {
    const configArray = Array.isArray(config) ? config : [config];

    return new ESLint({
        overrideConfigFile: true,
        overrideConfig: [...configArray, DEFAULT_PROJECT_SERVICE_CONFIG],
        ignore: false,
    });
}

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

export const lintFilePath = async (config: Config, filePath: string): Promise<ESLint.LintResult> => {
    const linter = createESLintInstance(config);
    const results = await linter.lintFiles([filePath]);
    return results[0];
};

const lintText = async (config: Config, code: string, filePath?: string): Promise<ESLint.LintResult> => {
    const linter = createESLintInstance(config);
    const filePathToUse = filePath ?? __filename;

    return (await linter.lintText(code, { filePath: filePathToUse }))[0];
};

export const lintWithDefaultConfig = async (code: string, filePath?: string): Promise<ESLint.LintResult> => {
    return await lintText(defaultConfig, code, filePath);
};

export const lintWithReactConfig = async (code: string, filePath?: string): Promise<ESLint.LintResult> => {
    return await lintText(reactConfig, code, filePath);
};
