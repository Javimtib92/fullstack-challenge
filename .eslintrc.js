module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    parserOptions: { ecmaVersion: 8 },
    ignorePatterns: ['node_modules/*', '!.prettierrc.js'],
    extends: ['eslint:recommended'],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx','**/*.*.ts'],
        parser: '@typescript-eslint/parser',
        env: {
          browser: true,
          node: true,
          es6: true,
        },
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'prettier/@typescript-eslint',
          'plugin:prettier/recommended',
          "plugin:import/errors",
          "plugin:import/warnings",
          "plugin:import/typescript",
        ],
        rules: {
          '@typescript-eslint/no-unused-vars': ['error'],
          '@typescript-eslint/explicit-function-return-type': [
            'warn',
            {
              allowExpressions: true,
              allowConciseArrowFunctionExpressionsStartingWithVoid: true,
            },
          ],
          'prettier/prettier': ['error', { endOfLine: 'auto' }, { usePrettierrc: true }],
          "import/no-unresolved": "off",
          "import/named": "warn",
          "import/namespace": "warn",
          "import/no-named-as-default": "off",
          "import/export": "warn",
          "import/order": [
            "error",
            {
              "groups": ["builtin", "external", "parent", "sibling", "index"],
              "newlines-between": "always",
              "alphabetize": {
                "order": "asc",
                "caseInsensitive": true
              }
            }
          ],
        },
      },
    ],
  }