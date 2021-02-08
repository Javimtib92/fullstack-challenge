module.exports = {
    extends: ['../.eslintrc.js'],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx', '**/*.*.tsx'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: "./tsconfig.json"
        },
      },
    ],
  }