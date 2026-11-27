# The API streams typed domain events over SSE, read by our own client

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

The product is a pipeline of steps (analyze each screen, map, repair, states, patches), not a chat. The UI must show progress per step, cancel, and retry from the last finished step.

## Decision

The API sends Server-Sent Events over a `fetch` POST response. Each event has a type, an `id` and a zod schema in `packages/events`. The web app reads the stream with a small hand-written reader. AI SDK is used on the server only.

## Alternatives considered

- **AI SDK `useChat`.** Less code. Rejected: its protocol models chat messages; our steps do not fit it.
- **WebSockets.** Rejected: the stream is one-way; user actions are plain HTTP requests. WebSockets are for live collaboration (Roadmap).
- **Browser `EventSource`.** Rejected: GET only, no request body, no custom headers.

## Consequences

**Positive**

- The event contract is ours, typed and validated on both sides.
- One reader for all steps, chat edits included.

**Negative**

- We own parsing, reconnect and cancel logic, and must test it.

## Conditions for review

Review if the product becomes mostly chat.
