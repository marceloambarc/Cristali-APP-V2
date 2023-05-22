module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  // eslint-disable-next-line no-dupe-keys
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  // eslint-disable-next-line no-dupe-keys
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
