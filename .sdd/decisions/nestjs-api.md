# The API is a NestJS server; Next.js is UI only

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

The AI pipeline is long: vision on up to 5 screens, mapping, repair and states can take 30–90 seconds. Every AI call must be traced. Evals need a fake provider.

## Decision

Run the API as a NestJS app on a server (Fly.io or Render). Next.js (`apps/web`) is UI only and calls the API.

## Alternatives considered

- **Next.js Route Handlers only.** One deploy, about a week faster. Rejected: serverless functions have duration limits; tracing and provider swap need more manual wiring.

## Consequences

**Positive**

- No serverless time limit on long pipelines.
- An interceptor traces every AI call in one place.
- DI swaps the real provider for a fake one in tests and evals.
- Zod pipes validate every body. A job queue can be added later.

**Negative**

- Two deploys and CORS or a proxy between web and API.
- About one more week of work.

## Conditions for review

Review if the pipeline becomes short enough for serverless limits and the second deploy costs more than it gives.
