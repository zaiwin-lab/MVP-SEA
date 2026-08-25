# SEA Digital Growth Advisor — Conversational Business Discovery Prototype

**Maturity:** Source-complete AI interaction prototype  
**Portfolio category:** Conversational discovery, digital-readiness guidance and proposal preparation  
**Production status:** Not verified as a public production service

SEA Digital Growth Advisor is a focused conversational prototype that explores how an entrepreneur could describe a business challenge, receive a digital-readiness discussion and progress toward a draft solution recommendation.

Unlike a scripted chat mock-up, this repository contains a real server-side integration with Anthropic's API and streams model-generated responses to a Next.js chat interface.

## Business problem

Entrepreneurs often receive technology proposals before their actual commercial needs are understood. Long forms can also create friction, while an open-ended consultation can be inconsistent and difficult to scale.

The prototype tests a middle path: a short guided conversation that seeks enough context to frame one practical recommendation and, when requested, a draft proposal structure.

## Intended users

- entrepreneurs exploring digital growth options;
- business advisers conducting early discovery;
- delivery teams qualifying a potential project;
- product teams evaluating conversational advisory patterns.

These are intended personas, not evidence of active users, association members, leads or customers.

## Demonstrated capabilities

- responsive chat interface with streaming assistant responses;
- server-side Anthropic SDK integration;
- a structured advisory prompt covering discovery, recommendation and proposal stages;
- one-question-at-a-time conversation design;
- English, Bahasa Malaysia and mixed-register response guidance;
- three configured solution categories with example investment ranges;
- draft digital-readiness summaries, recommendations and proposal outlines;
- graceful client-side handling of connection failures.

## Verified implementation

| Layer | Evidence in this repository |
|---|---|
| Framework | Next.js 14 App Router, React 18 and TypeScript |
| Interface | Tailwind CSS chat components |
| AI provider | Anthropic TypeScript SDK |
| Model configuration | `claude-sonnet-4-6` in the server route |
| Prompting | Versioned system prompt in `lib/sea-prompt.ts` |
| Response delivery | Streaming text through `app/api/chat/route.ts` |
| Persistence | Not implemented |
| Authentication | Not implemented |
| CRM / proposal export | Not implemented |
| Payment processing | Not implemented |

An `ANTHROPIC_API_KEY` is required at runtime. The repository contains only a placeholder example, not a key.

## What the prototype does not prove

- It does not verify that a recommendation is commercially, legally or technically suitable.
- The digital-readiness score is model-generated, not a validated assessment instrument.
- Example packages, prices, timelines and outcomes are prompt content, not binding quotations.
- It does not create a customer record, export an approved proposal, collect a deposit or complete a human handoff.
- It does not provide authentication, rate limiting, abuse protection, input-schema validation, audit logging or conversation persistence.
- It has no evidenced evaluation set for accuracy, consistency, bias, safety or conversion quality.
- No public deployment of this exact Next.js source was verified on 25 August 2026.

## Organisational and brand boundary

The interface and prompt currently describe the adviser as “official” and display **Sarawak Entrepreneurs Association × KOBIS Berhad** positioning. This repository does not itself evidence an appointment, partnership, approval or licence to represent either organisation publicly.

Before external use, an authorised owner must validate the name, branding, mandate, product catalogue, pricing and escalation contacts. Until then, treat the product as a portfolio prototype rather than an official advisory service.

## Strategic value

The project is valuable as a compact example of model-backed business software:

1. the AI capability is implemented server-side rather than simulated in the interface;
2. the advisory behaviour is explicit and reviewable in a versioned prompt;
3. streaming improves the usability of longer business responses;
4. the narrow discovery-to-recommendation flow is suitable for controlled evaluation;
5. the codebase is small enough to harden through measured iterations.

## Delivery role

**Ts. Zaiwin Kassim** led the product framing, advisory journey, commercial logic and solution direction with the **KOBIS AI Prodigy Team**, using supervised AI-assisted development.

This role statement does not imply endorsement, adoption, revenue, client delivery or authorisation from organisations named in the prototype.

## Responsible AI and privacy

Before a pilot:

- show a clear AI disclosure and obtain consent before sending user text to a model provider;
- minimise personal and commercially sensitive information in prompts;
- publish retention, deletion and cross-border processing information;
- apply input validation, rate limits, content controls and server-side error handling;
- protect the API key and monitor cost, abuse and availability;
- require a named human adviser to review recommendations, prices and proposals;
- test hallucination, prompt injection, language quality, inconsistent scoring and high-pressure sales behaviour;
- keep the assistant away from legal, financial, tax, regulated eligibility and guaranteed-return advice;
- provide an accessible path to stop, correct data or speak with a person.

A generated proposal is a draft for human review, not an offer, contract, invoice or approval.

## Run locally

```bash
npm install
cp .env.example .env.local
# Add a valid ANTHROPIC_API_KEY to .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Evidence needed for the next maturity stage

Create a consented pilot with synthetic or low-risk inputs, a documented evaluation set and human-reviewed outputs. Measure recommendation grounding, language quality, unsafe-claim rate and handoff completion before exposing pricing or proposal generation to real prospects.
