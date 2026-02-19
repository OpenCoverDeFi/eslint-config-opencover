import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { RulesConfig } from '@eslint/core';

export type Awaitable<T> = T | Promise<T>;

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & RulesConfig>, 'plugins'> & {
    /**
     * Custom name of each config item
     */
    name?: string;

    /**
     * Plugins configuration
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins?: Record<string, any>;
};

export interface OptionsFiles {
    /**
     * Override the `files` option to provide custom globs.
     */
    files?: string[];
}

export interface OptionsTypeScript {
    /**
     * Enable TypeScript support.
     *
     * @default auto-detect based on the dependencies
     */
    typescript?:
        | boolean
        | {
              /**
               * Override rules for TypeScript files.
               */
              overrides?: Partial<RulesConfig>;
          };

    /**
     * Path to tsconfig.json for type-aware rules.
     *
     * @default undefined
     */
    tsconfigPath?: string;
}

export interface OptionsReact {
    /**
     * Enable React support.
     *
     * @default false
     */
    react?:
        | boolean
        | {
              /**
               * Override rules for React files.
               */
              overrides?: Partial<RulesConfig>;
          };
}

export interface OptionsStylistic {
    /**
     * Enable stylistic rules.
     *
     * @default true
     */
    stylistic?:
        | boolean
        | {
              /**
               * Override rules for stylistic.
               */
              overrides?: Partial<RulesConfig>;
          };
}

export interface OptionsTest {
    /**
     * Enable test support.
     *
     * @default true
     */
    test?:
        | boolean
        | {
              /**
               * Override rules for test files.
               */
              overrides?: Partial<RulesConfig>;
          };
}

export interface OptionsImports {
    /**
     * Enable imports rules.
     *
     * @default true
     */
    imports?:
        | boolean
        | {
              /**
               * Override rules for imports.
               */
              overrides?: Partial<RulesConfig>;
          };
}

export interface OptionsUnicorn {
    /**
     * Enable unicorn rules.
     *
     * @default true
     */
    unicorn?:
        | boolean
        | {
              /**
               * Override rules for unicorn.
               */
              overrides?: Partial<RulesConfig>;
          };
}

export interface OptionsGitignore {
    /**
     * Enable gitignore support.
     *
     * @default true
     */
    gitignore?: boolean | FlatGitignoreOptions;

    /**
     * Additional ignore patterns.
     *
     * @default []
     */
    ignores?: string[];
}

export interface OptionsConfig
    extends
        OptionsTypeScript,
        OptionsReact,
        OptionsStylistic,
        OptionsTest,
        OptionsImports,
        OptionsUnicorn,
        OptionsGitignore {
    /**
     * General rule overrides that apply to all files.
     */
    overrides?: Partial<RulesConfig>;
}
