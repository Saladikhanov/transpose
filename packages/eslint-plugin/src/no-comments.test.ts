import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { describe, it } from 'vitest';
import { noComments } from './no-comments.ts';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({ languageOptions: { parser: tseslint.parser } });

ruleTester.run('no-comments', noComments, {
  valid: [
    { name: 'code with no comments', code: 'export const a = 1;' },
    { name: 'doc comment on an export', code: '/** The answer. */\nexport const a = 42;' },
    {
      name: 'doc comment on a function',
      code: '/** Adds. */\nfunction add(a: number, b: number) { return a + b; }',
    },
    {
      name: 'doc comment on an interface member',
      code: 'export interface P {\n  /** The label. */\n  label: string;\n}',
    },
    { name: 'why comment', code: '// Why: the API returns cents, not euros.\nexport const price = 1;' },
  ],
  invalid: [
    {
      name: 'plain line comment',
      code: '// add one\nexport const a = 1;',
      errors: [{ messageId: 'notAllowed' }],
    },
    {
      name: 'plain block comment',
      code: '/* note */\nexport const a = 1;',
      errors: [{ messageId: 'notAllowed' }],
    },
    { name: 'trailing comment', code: 'export const a = 1; // one', errors: [{ messageId: 'notAllowed' }] },
    {
      name: 'why without a space',
      code: '//Why: x\nexport const a = 1;',
      errors: [{ messageId: 'notAllowed' }],
    },
    { name: 'empty why', code: '// Why: \nexport const a = 1;', errors: [{ messageId: 'notAllowed' }] },
    {
      name: 'doc comment inside a function body',
      code: 'export function f() {\n  /** inner */\n  const a = 1;\n  return a;\n}',
      errors: [{ messageId: 'docInFunction' }],
    },
    { name: 'TODO', code: '// TODO: fix\nexport const a = 1;', errors: [{ messageId: 'shortcut' }] },
    {
      name: 'workaround inside a why comment',
      code: '// Why: workaround for the bug\nexport const a = 1;',
      errors: [{ messageId: 'shortcut' }],
    },
    {
      name: 'temporary inside a doc comment',
      code: '/** Temporary until v2. */\nexport const a = 1;',
      errors: [{ messageId: 'shortcut' }],
    },
    {
      name: 'prettier-ignore',
      code: '// prettier-ignore\nexport const a = 1;',
      errors: [{ messageId: 'notAllowed' }],
    },
  ],
});
