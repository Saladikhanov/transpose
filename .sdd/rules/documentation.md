# Documentation

## Writing style: ASD-STE100 at about 80%

We use the writing rules of ASD-STE100 Simplified Technical English. We do not use its approved dictionary, and we allow `-ing` forms and common software terms.

1. Write one instruction per sentence.
2. Keep procedure sentences to 20 words or fewer. Keep descriptive sentences to 25 words or fewer.
3. Use the imperative for instructions: "Use `Panel` for a section block."
4. Use the active voice.
5. Use one word for one meaning. Use the terms in the [glossary](../glossary.md).
6. Keep a paragraph to 6 sentences or fewer.
7. Use a numbered list for steps, in the order the reader does them.
8. Put a warning or a caution before the step it is about.
9. Do not use idioms, slang or vague words: "simply", "just", "easy", "etc.".

This applies to READMEs, `docs/`, `.sdd/`, component MDX, DS guidelines and prompts.

## Markdown

1. Start each file with one `#` heading.
2. Use tables for comparisons and lists of facts.
3. Use relative links between docs.

## Comments in code

Code must say what it does through names, types and small functions. Comments are allowed in two forms only:

1. **A doc comment** (`/** ... */`) on a declaration: an export, a function, a type, an interface member. Never inside a function body.
2. **A why comment**: one line that starts with `// Why: `, and gives a reason the code cannot show. Example: `// Why: the API returns cents, not euros.`

Do not write shortcut notes: TODO, FIXME, hack, workaround, temporary, "for now". Fix the problem now, or open an issue and link it from the PR.

Do not write a comment that says what the next line does.

## TSDoc

1. Write TSDoc for each exported function, component and type of a package.
2. Say what it does and what it returns. Do not repeat the type signature in words.
