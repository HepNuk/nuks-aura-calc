module.exports = {
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser' },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
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
