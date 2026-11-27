import type { ESLint } from 'eslint';
import { noComments } from './no-comments.ts';

/** ESLint rules that hold the conventions in `.sdd/rules/`. */
export const transposePlugin: ESLint.Plugin = {
  meta: { name: '@transpose/eslint-plugin' },
  rules: { 'no-comments': noComments },
};
