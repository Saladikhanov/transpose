# Glossary

One term, one meaning. Use these terms in code, docs and prompts.

| Term               | Meaning                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Screenshot**     | An image of one screen of a product, uploaded by the user                                                   |
| **Flow**           | An ordered set of 1–5 screenshots that show one user journey                                                |
| **Semantic tree**  | The output of Analyze: what is on a screen, with no link to components. Example: `header`, `primary action` |
| **Plan review**    | The step where the user approves or edits the semantic tree before Build                                    |
| **Component tree** | The output of Map: a JSON tree of DS components and props, valid against the manifest                       |
| **Manifest**       | `manifest.json`: the list of DS components, their props, levels, docs and rules. Generated from code        |
| **Repair**         | A new model call that receives the zod errors of an invalid component tree and returns a fixed tree         |
| **Placeholder**    | What the renderer shows for an unknown component or invalid props                                           |
| **State**          | One version of a screen: default, loading, empty, error, success, disabled, and others                      |
| **Missing state**  | A state the flow needs that the screenshots do not show                                                     |
| **Patch**          | A JSON Patch on a component tree, proposed by the model in a chat edit                                      |
| **Theme**          | A set of token values. Has two axes: brand and mode                                                         |
| **Mode**           | `light` or `dark`                                                                                           |
| **Token**          | A named design value in DTCG JSON. Layers: primitive, semantic, component                                   |
| **Level**          | The atomic level of a component: atom, molecule, organism, template                                         |
| **Citation**       | A link to a doc file and heading that supports a model statement                                            |
| **AI call**        | One request to a model. Each AI call has a row in `ai_calls`                                                |
| **Event**          | One typed message in the SSE stream from the API to the web app                                             |
