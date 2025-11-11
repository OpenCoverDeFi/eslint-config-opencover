import type { Rule } from 'eslint';

type Options = [
	{
		ignorePattern?: string[];
	},
];

type OptionsObject = Options[0];

type RuleContext = Parameters<Rule.RuleModule['create']>[0];
type RuleListener = ReturnType<Rule.RuleModule['create']>;

function isOptionsObject(value: unknown): value is OptionsObject {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	if (!('ignorePattern' in value) || !Array.isArray(value.ignorePattern)) {
		return false;
	}
	if (value.ignorePattern.some((pattern: string) => typeof pattern !== 'string')) {
		return false;
	}
	return true;
}

function getOptions(context: RuleContext): OptionsObject {
	const firstOption: unknown = Array.isArray(context.options) ? context.options[0] : {};
	return isOptionsObject(firstOption) ? firstOption : {};
}

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow dots in filenames (except .test. in test files)',
		},
		messages: {
			noDotsInFilename: 'Filename should not contain dots (except .test. in test files)',
		},
		schema: [
			{
				type: 'object',
				properties: {
					ignorePattern: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
				additionalProperties: false,
			},
		],
	},
	create(context: RuleContext): RuleListener {
		const options = getOptions(context);
		const ignorePatterns = options.ignorePattern ?? [];

		const basename = context.filename.split('/').pop() ?? '';

		// Check if filename matches any ignore pattern
		const matchesIgnorePattern = ignorePatterns.some((pattern: string) => {
			const regex = new RegExp(pattern);
			return regex.test(basename);
		});

		if (matchesIgnorePattern) {
			return {};
		}

		// Extract the base name without extension
		// Match filename like: name.test.ts or name.ts
		const testFileMatch = basename.match(/^(.+?)\.test\.([^.]+)$/);
		const regularFileMatch = basename.match(/^(.+?)(\.[^.]+)$/);

		let shouldReport = false;

		if (testFileMatch) {
			// Test file: check that the part before .test. has no dots
			const nameBeforeTest = testFileMatch[1];
			if (nameBeforeTest.includes('.')) {
				shouldReport = true;
			}
		} else if (regularFileMatch) {
			// Regular file: no dots should be allowed (except extension)
			const nameWithoutExt = regularFileMatch[1];
			if (nameWithoutExt.includes('.')) {
				shouldReport = true;
			}
		}

		if (shouldReport) {
			return {
				Program(node: Rule.Node) {
					context.report({
						node,
						messageId: 'noDotsInFilename',
					});
				},
			} as RuleListener;
		}

		return {};
	},
};
