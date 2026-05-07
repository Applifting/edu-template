/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'index.js',
    '**/*.spec.ts',
    '**/*.test.ts',
    'coverage/**',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
  },
  overrides: [
    {
      // DTOs are presentation-layer types. Only files that own the HTTP
      // boundary (controllers and the DTOs themselves) may reference them.
      // Anywhere else should depend on domain types instead.
      files: ['src/**/*.ts'],
      excludedFiles: [
        'src/**/*.controller.ts',
        'src/**/controllers/**',
        'src/**/dto/**',
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['**/dto/**', '**/*.dto'],
                message:
                  'DTOs are presentation-layer types and must only be imported by controllers (or other DTOs). Depend on the domain type instead.',
              },
            ],
          },
        ],
      },
    },
  ],
};

module.exports = config;
