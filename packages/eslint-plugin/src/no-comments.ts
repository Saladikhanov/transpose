import type { Rule } from 'eslint';
import type { Comment } from 'estree';

const WHY_PREFIX = /^ Why: \S/;
const HACK_WORDS = /\b(todo|fixme|hack|xxx|temporary|temporarily|workaround|for now|quick fix)\b/i;
const FUNCTION_TYPES = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression']);

function isDocComment(comment: Comment): boolean {
  return comment.type === 'Block' && comment.value.startsWith('*');
}

function isInsideFunction(comment: Comment, context: Rule.RuleContext): boolean {
  const { sourceCode } = context;
  const next = sourceCode.getTokenAfter(comment, { includeComments: false });
  if (!next) return false;
  const node = sourceCode.getNodeByRangeIndex(next.range[0]);
  if (!node) return false;
  return [node, ...sourceCode.getAncestors(node)].some((n) => FUNCTION_TYPES.has(n.type) && n !== node);
}

/**
 * Reports every comment except two forms:
 * a doc comment outside function bodies, and a one-line comment that starts with `// Why: `.
 * Reports any comment that contains a word from `HACK_WORDS`.
 */
export const noComments: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Allow only doc comments and `// Why:` comments, and no shortcut notes.' },
    schema: [],
    messages: {
      notAllowed:
        'Comments are not allowed. Make the code say it, or use a doc comment on a declaration, or `// Why: <reason>`.',
      docInFunction: 'Doc comments go on declarations, not inside function bodies.',
      shortcut:
        'Shortcut notes (TODO, FIXME, hack, workaround, temporary) are not allowed. Fix it now or open an issue.',
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          const loc = comment.loc ?? { line: 1, column: 0 };
          if (HACK_WORDS.test(comment.value)) {
            context.report({ loc, messageId: 'shortcut' });
          } else if (isDocComment(comment)) {
            if (isInsideFunction(comment, context)) context.report({ loc, messageId: 'docInFunction' });
          } else if (!(comment.type === 'Line' && WHY_PREFIX.test(comment.value))) {
            context.report({ loc, messageId: 'notAllowed' });
          }
        }
      },
    };
  },
};
