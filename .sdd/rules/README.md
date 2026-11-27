# Rules

Standing instructions. People and AI read them before they plan and before they implement.

A rule is a convention with no real alternative. A choice with a rejected alternative is a [decision](../decisions/). A rule can state a constraint that comes from a decision. Then it links to the decision and does not repeat the reasoning.

| Rule                                        | Covers                                          | Read it when                                  |
| ------------------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| [Code organisation](code-organisation.md)   | Packages, dependency direction, file size       | You create, move or split a file              |
| [TypeScript and React](typescript-react.md) | Language, React, validation, tests              | You write code                                |
| [Design system](design-system.md)           | Tokens, levels, components, themes              | You change `packages/tokens` or `packages/ds` |
| [AI layer](ai-layer.md)                     | Prompts, model output, tracing, safety          | You change `packages/ai` or call a model      |
| [Documentation](documentation.md)           | Writing style (STE100 at ~80%), Markdown, TSDoc | You write or change any doc                   |
| [Commit convention](commit-convention.md)   | Commit and PR title grammar                     | You commit or open a PR                       |

## Precedence

- A rule outranks habit and existing code.
- A rule outranks a plan. A plan that needs an exception names the rule, the reason and the end date.
- Two rules in conflict is a defect. Apply the more specific rule. Then raise the conflict with `/improve`.
