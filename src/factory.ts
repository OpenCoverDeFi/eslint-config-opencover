import gitignore from 'eslint-config-flat-gitignore';
import { isPackageExists } from 'local-pkg';
import { ignores } from './configs/ignores.js';
import { imports } from './configs/imports.js';
import { javascript } from './configs/javascript.js';
import { reactConfig } from './configs/react.js';
import { stylisticConfig } from './configs/stylistic.js';
import { test } from './configs/test.js';
import { typescript } from './configs/typescript.js';
import { unicornConfig } from './configs/unicorn.js';
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types.js';

/**
 * Create an ESLint flat config for OpenCover projects.
 *
 * @param options Configuration options
 * @param userConfigs Additional user configurations to merge
 * @returns ESLint flat config array
 */
export async function opencover(
    options: OptionsConfig = {},
    ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
    const {
        typescript: enableTypeScript = isPackageExists('typescript'),
        tsconfigPath,
        react: enableReact = false,
        stylistic: enableStylistic = true,
        test: enableTest = true,
        imports: enableImports = true,
        unicorn: enableUnicorn = true,
        gitignore: enableGitignore = true,
        ignores: userIgnores = [],
    } = options;

    const configs: TypedFlatConfigItem[] = [];

    // Global ignores
    if (enableGitignore) {
        if (typeof enableGitignore !== 'boolean') {
            const gitignoreConfig = gitignore({
                name: 'opencover/gitignore',
                ...enableGitignore,
            });

            configs.push(gitignoreConfig);
        } else {
            const gitignoreConfig = gitignore({
                name: 'opencover/gitignore',
                strict: false,
            });

            configs.push(gitignoreConfig);
        }
    }

    configs.push(...ignores(userIgnores));

    // JavaScript base
    configs.push(...javascript(options.overrides));

    // TypeScript
    if (enableTypeScript) {
        configs.push(
            ...typescript({
                tsconfigPath,
                overrides:
                    options.typescript && typeof options.typescript === 'object' ? options.typescript.overrides : {},
            })
        );
    }

    // Stylistic
    if (enableStylistic) {
        configs.push(
            ...stylisticConfig(
                options.stylistic && typeof options.stylistic === 'object' ? options.stylistic.overrides : {}
            )
        );
    }

    // Imports
    if (enableImports) {
        configs.push(
            ...imports(options.imports && typeof options.imports === 'object' ? options.imports.overrides : {})
        );
    }

    // Unicorn
    if (enableUnicorn) {
        configs.push(
            ...unicornConfig(options.unicorn && typeof options.unicorn === 'object' ? options.unicorn.overrides : {})
        );
    }

    // Test
    if (enableTest) {
        configs.push(...test(options.test && typeof options.test === 'object' ? options.test.overrides : {}));
    }

    // React
    if (enableReact) {
        configs.push(
            ...reactConfig({
                typescript: !!enableTypeScript,
                tsconfigPath,
                overrides: options.react && typeof options.react === 'object' ? options.react.overrides : {},
            })
        );
    }

    // Add user configs
    for (const config of userConfigs) {
        const resolved = await config;

        if (Array.isArray(resolved)) {
            configs.push(...resolved);
        } else {
            configs.push(resolved);
        }
    }

    return configs;
}
