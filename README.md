# Digital Twin — marketing/creative agency

An AI digital twin of you (the founder) that:

- **talks to prospects** in your voice, qualifies them, and books calls
- **captures & scores leads** automatically (hot / warm / cold)
- **escalates** high-value opportunities to you
- **drafts content** (LinkedIn, Instagram, email, cold DMs) that sounds like you

Built on the Claude API (Opus 4.8). This is **Phase 1** of the agency plan — the twin itself.

## How it works

```
src/
  client.ts       Anthropic client (reads ANTHROPIC_API_KEY)
  config.ts       models + agency identity (from .env)
  persona.ts      builds the system prompt (identity, voice, behavior rules)
  retrieval.ts    lightweight RAG over the knowledge base (no extra API keys)
  tools.ts        lead tools the twin can call (capture_lead, book_call, escalate)
  leads.ts        lead storage (data/leads.json) + deterministic qualification scoring
  twin.ts         the engine: streaming agentic chat loop + content generation
  cli.ts          terminal interface to talk to your twin
  knowledge/      YOUR brain & voice — edit these markdown files
    about.md          who you are / positioning   (always in context)
    voice.md          how you talk                (always in context)
    services.md       packages & pricing          (retrieved on demand)
    faq.md            common questions            (retrieved on demand)
    case-studies.md   proof                       (retrieved on demand)
```

The twin's **voice and facts come entirely from `src/knowledge/`** — it's instructed never to invent prices, results, or guarantees. Make it yours by editing those five files.

## Setup

```bash
npm install
cp .env.example .env        # then add your ANTHROPIC_API_KEY and agency details
npm run chat
```

Get an API key at https://platform.claude.com/.

## Using it

At the `prospect ▸` prompt, type as if you were a prospect — the twin responds as you, qualifies, and captures the lead. Commands:

| Command | What it does |
|---|---|
| `/post <brief>` | draft a LinkedIn post in your voice |
| `/ig <brief>` | draft an Instagram caption |
| `/email <brief>` | draft a nurture email |
| `/dm <brief>` | draft a cold outreach DM |
| `/leads` | show captured leads, ranked by qualification |
| `/reset` | start a fresh conversation |
| `/help` · `/exit` | help / quit |

Captured leads are saved to `data/leads.json`.

### Try it

```
prospect ▸ hey, I run a coaching business doing about 30k a month but my content is all over the place and I have no time. can you help?
prospect ▸ /post why most founder content sounds like everyone else
```

## Customizing your twin

1. **Edit `src/knowledge/about.md` and `voice.md`** — this is what makes it sound like *you*. Add real phrases you use.
2. **Edit `services.md`, `faq.md`, `case-studies.md`** — put in your real offers, pricing, and (honest) results.
3. **Set identity in `.env`** — `AGENCY_NAME`, `FOUNDER_NAME`, `BOOKING_LINK`, `TIMEZONE`.

## Cost & models

Defaults to `claude-opus-4-8` for best voice and sales reasoning. To cut cost, set `TWIN_CHAT_MODEL=claude-haiku-4-5` in `.env`.

## Where this goes next (Phase 2/3)

This core is built to plug into the rest of the agency plan:

- **Website chat widget** — wrap `chatTurn()` in an HTTP endpoint (e.g. Express/Next API route) and drop a chat bubble on your site.
- **DM/email auto-responder** — call `chatTurn()` from your inbox/DM webhook.
- **Real booking + CRM** — replace the `book_call`/`capture_lead` tool bodies in `tools.ts` with Cal.com + HubSpot/Notion calls.
- **Semantic retrieval** — swap the keyword scorer in `retrieval.ts` for Voyage embeddings when the knowledge base grows.

`npm run typecheck` validates the build.
