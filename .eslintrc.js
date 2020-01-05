module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/prop-types': 'off',
  },
  globals: {
    graphql: false,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],
      },
    },
  ],
};
