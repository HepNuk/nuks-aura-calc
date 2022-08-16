module.exports = {
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-trailing-spaces': ['warn'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_', // Variables can have leading underscore
        argsIgnorePattern: '^_', // Function arguments can have leading underscore
      },
    ],
    'vue/no-unused-components': 'warn',
    'no-constant-condition': 'warn',
    curly: ['warn', 'all'],
    quotes: [2, 'single', 'avoid-escape'],
    'no-unused-vars': 'off',

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
  },
};
