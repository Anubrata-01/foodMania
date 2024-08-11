/* eslint-disable no-undef */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',  // Disable PropTypes rule
    'react/react-in-jsx-scope':'off',
    'react/no-unknown-property':'off',
    'no-unsafe-optional-chaining':"off",
    'no-unused-vars': 'off',   // Show a warning for unused variables instead of an error
    'no-undef': 'error',        // Show an error for undefined variables
    'react-refresh/only-export-components': 'off',  // Disable the React Refresh rule
  },
  settings: {
    react: {
      version: 'detect',  // Automatically detect the react version
    },
  },
};
