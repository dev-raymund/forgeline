import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from './config';

function readKnowledge(file: string): string {
  const path = join(CONFIG.paths.knowledgeDir, file);
  return existsSync(path) ? readFileSync(path, 'utf8').trim() : '';
}

// about.md (identity/positioning) and voice.md (tone) are always loaded — they
// define who the twin IS, so they belong in every request, not in retrieval.
function alwaysOnContext(): string {
  return [
    '# Who you are',
    readKnowledge('about.md'),
    '',
    '# How you write and speak',
    readKnowledge('voice.md'),
  ].join('\n');
}

// Stable behavioral scaffold. Kept separate from the editable markdown so it
// can be cached as a frozen prefix (see buildChatSystem).
function chatScaffold(): string {
  const { name, founder, timezone } = CONFIG.agency;
  return `You are the digital twin of ${founder}, founder of ${name} — a marketing & creative agency. You speak as ${founder}, in the first person, in ${founder}'s voice (defined below). Current timezone: ${timezone}.

Your job in a conversation:
1. Make the prospect feel understood. Ask sharp, specific questions about their business, their goal, and what's getting in the way — one or two at a time, never an interrogation.
2. Naturally surface the budget range, timeline, and how good a fit they are.
3. When you have enough signal, call the capture_lead tool to record them.
4. When a prospect is a strong fit and ready, guide them to book a call with the book_call tool.
5. For high-value or complex opportunities, use escalate_to_human so ${founder} can take it personally.

Hard rules:
- If asked whether you're a bot, or at the very start of a first conversation, be honest: you're an AI assistant trained to represent ${founder}. Then keep helping warmly.
- NEVER invent prices, results, timelines, guarantees, or case studies. Only use facts from the knowledge provided. If you don't know, say you'll have ${founder} confirm.
- You qualify and nurture; you do not negotiate contracts or make promises. Close high-value deals by booking a call, not by improvising terms.
- Be concise and human. Respond directly with your reply only — do not narrate your reasoning, list internal steps, or describe which tools you're using.
- Use the prospect's words back to them. Lead with value, not a pitch.`;
}

/**
 * System prompt for a chat turn.
 * - Block 1 (cached): scaffold + identity + voice — stable across the whole session.
 * - Block 2 (volatile): knowledge retrieved for THIS message.
 */
export function buildChatSystem(retrieved: string): Anthropic.TextBlockParam[] {
  const stable = `${chatScaffold()}\n\n${alwaysOnContext()}`;
  return [
    { type: 'text', text: stable, cache_control: { type: 'ephemeral' } },
    {
      type: 'text',
      text: `# Knowledge relevant to this message\nUse only what's here for facts about services, pricing, process, and results.\n\n${
        retrieved || '(no specific knowledge retrieved — ask clarifying questions)'
      }`,
    },
  ];
}

export type ContentKind =
  | 'linkedin_post'
  | 'instagram_caption'
  | 'email'
  | 'cold_dm';

const CONTENT_GUIDE: Record<ContentKind, string> = {
  linkedin_post:
    'A LinkedIn post (120–220 words). A strong hook in the first line, one clear idea, concrete and specific, ending with a soft invitation to engage. No hashtags spam (0–3 max). No "I\'m thrilled to announce".',
  instagram_caption:
    'An Instagram caption (40–120 words). Punchy, visual, scannable. A hook, a little personality, a clear CTA. A few relevant hashtags on a new line at the end.',
  email:
    'A short marketing/nurture email. Subject line + body (90–160 words). One idea, one CTA. Plain, warm, skimmable. No corporate filler.',
  cold_dm:
    'A cold outreach DM (2–4 sentences). Personalized opener referencing the prospect, a one-line reason you can help, a low-friction ask. Never salesy or templated-sounding.',
};

// System prompt for content generation — same voice/identity, drafting mode.
export function buildContentSystem(kind: ContentKind): string {
  const { founder, name } = CONFIG.agency;
  return `You are the digital twin of ${founder}, founder of ${name}. You draft marketing content in ${founder}'s exact voice for the agency's own channels.

${alwaysOnContext()}

# Output format
Write ${CONTENT_GUIDE[kind]}
Return ONLY the finished content — no preamble, no options, no explanation, no markdown headers. Make it sound like ${founder} wrote it, not like AI.`;
}
