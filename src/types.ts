import type { Linter } from 'eslint';
import type { RulesConfig } from '@eslint/core';

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
