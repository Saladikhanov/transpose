import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { transposePlugin } from './packages/eslint-plugin/src/index.ts';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**'] },
  { linterOptions: { noInlineConfig: true, reportUnusedDisableDirectives: 'error' } },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': true, 'ts-ignore': true, 'ts-nocheck': true },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: 'ExportDefaultDeclaration', message: 'Use named exports.' },
      ],
    },
  },
  { files: ['**/*.js', '**/*.mjs'], ...tseslint.configs.disableTypeChecked },
  { files: ['scripts/**'], languageOptions: { globals: globals.node } },
  { files: ['**/*.config.{js,ts,mjs}'], rules: { 'no-restricted-syntax': 'off' } },
  { plugins: { transpose: transposePlugin }, rules: { 'transpose/no-comments': 'error' } },
);
