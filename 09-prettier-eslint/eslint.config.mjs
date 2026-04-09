// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(eslint.configs.recommended, {
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },

  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
  ],
  rules: {
    'no-console': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
  },
});
