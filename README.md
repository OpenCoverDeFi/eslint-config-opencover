# eslint-config-opencover

> ESLint Typescript shareable config for OpenCover's coding style

## Install

> Make sure you have already installed `eslint` and `typescript` as they are required packages.

```console
yarn add -D eslint-config-opencover
```

Then, add this to your `.eslintrc.js`:

```js
module.exports = {
	extends: "@opencover/eslint-config-opencover",
	rules: {
		// your overrides
	},
};
```

### Usage for React

Adjust your `.eslintrc.js` like this:

```js
module.exports = {
	extends: "@opencover/eslint-config-opencover/with-react",
	rules: {
		// your overrides
	},
};
```

### Add to .eslintignore certain files, for example:

```
*.css
*.svg
```

### (Optional) Add .prettierc.json with this preferred configuration

```
{
    "printWidth": 100,
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true
}
```


### (Optional) Linting with vscode

If you are using vscode this `.vscode/settings.json` file may come in handy:

```
{
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
    "eslint.alwaysShowStatus": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.rulers": [100]
}
```
