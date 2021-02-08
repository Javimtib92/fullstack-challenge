module.exports = {
    extends: ['../.eslintrc.js'],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx', '**/*.*.tsx'],
        parser: '@typescript-eslint/parser',
        settings: { react: { version: 'detect' } },
        env: {
          browser: true,
          node: true,
          es6: true,
        },
        extends: [
          'plugin:react/recommended',
          'plugin:react-hooks/recommended',
          'plugin:jsx-a11y/recommended',
        ],
        rules: {
          'react/prop-types': 'off',
          'react/react-in-jsx-scope': 'off',
        },
      },
    ],
  }