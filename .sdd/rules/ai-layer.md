# AI layer

The reasoning is in [two-step-pipeline](../decisions/two-step-pipeline.md) and [model-writes-json-not-code](../decisions/model-writes-json-not-code.md).

1. Call a model only through `packages/ai`. Do not import a provider SDK anywhere else.
2. Keep every prompt in `packages/ai/prompts/<name>.md` with a version in its front matter. Change the version when you change the prompt.
3. Validate every model output with zod. On failure, repair at most 2 times, then show placeholders.
4. The model returns data (JSON). Code comes from `packages/codegen` only.
5. Nothing the model proposes is applied without a user click: plan, patch, new state.
6. Record every AI call in `ai_calls`: model, prompt version, tokens, cost, latency, repairs, fallback.
7. Set a timeout on every AI call. Stop the model call when the client disconnects.
8. Do not send personal data to a model when you can remove it. Do not log image content.
9. A change to a prompt or a model needs eval results in the PR.
10. Prompts tell the model not to invent content. Generated screens use the text read from the screenshot, or neutral placeholders. Never invented prices, names or facts.
