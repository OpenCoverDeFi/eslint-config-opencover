import type { ESLint } from 'eslint';
import { rule as noUnnecessaryOptionalChainRule } from './rules/no-unnecessary-optional-chain.js';
import { rule as filenameNoDotsRule } from './rules/filename-no-dots.js';
import { rule as noUnnecessaryAsAssertionRule } from './rules/no-unnecessary-as-assertion.js';
import { rule as noUnnecessaryTypeofRule } from './rules/no-unnecessary-typeof.js';
import { rule as noUnnecessaryLogicalOrRule } from './rules/no-unnecessary-logical-or.js';
import { rule as complexFunctionsRequireReturnTypeRule } from './rules/complex-functions-require-return-type.js';

const config: ESLint.Plugin = {
    meta: {
        name: 'opencover-eslint',
        version: '1.0.0',
    },
    rules: {
        'no-unnecessary-optional-chain': noUnnecessaryOptionalChainRule,
        'filename-no-dots': filenameNoDotsRule,
        'no-unnecessary-as-assertion': noUnnecessaryAsAssertionRule,
        'no-unnecessary-typeof': noUnnecessaryTypeofRule,
        'no-unnecessary-logical-or': noUnnecessaryLogicalOrRule,
        'complex-functions-require-return-type': complexFunctionsRequireReturnTypeRule,
    },
};

export default config;
