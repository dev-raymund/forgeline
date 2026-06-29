import type Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from './config';
import {
  type CaptureLeadInput,
  markBooked,
  markEscalated,
  upsertLead,
} from './leads';
import type { TwinEvent } from './types';

// Client-side tools the twin can call mid-conversation.
export const TOOLS: Anthropic.Tool[] = [
  {
    name: 'capture_lead',
    description:
      "Record or update a prospect once you know who they are and what they need. Call this as soon as you have a name and a way to reach them, then update it as you learn budget/timeline. Don't ask for everything at once — capture what you have.",
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "Prospect's name" },
        contact: {
          type: 'string',
          description: 'Email address or social handle to reach them',
        },
        company: { type: 'string', description: 'Their business/brand name' },
        need: {
          type: 'string',
          description: 'What they want help with, in their words',
        },
        budget_band: {
          type: 'string',
          enum: ['unknown', 'under_1k', '1k_5k', '5k_15k', '15k_plus'],
          description: 'Best estimate of their budget range (monthly or project)',
        },
        timeline: {
          type: 'string',
          enum: ['unknown', 'exploring', 'this_quarter', 'now'],
          description: 'How soon they want to start',
        },
        fit_notes: {
          type: 'string',
          description: 'Short note on why they are/aren\'t a good fit',
        },
      },
      required: ['name', 'contact'],
    },
  },
  {
    name: 'book_call',
    description:
      'Use when a qualified, ready prospect wants to talk. Returns the booking link to share with them.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        contact: { type: 'string', description: 'Email or handle' },
        preferred_time: {
          type: 'string',
          description: 'Any timing preference they mentioned (optional)',
        },
      },
      required: ['name', 'contact'],
    },
  },
  {
    name: 'escalate_to_human',
    description:
      'Flag a high-value or complex opportunity for the founder to handle personally. Use for large budgets, unusual requests, or when the prospect explicitly asks for the founder.',
    input_schema: {
      type: 'object',
      properties: {
        contact: { type: 'string', description: 'Email or handle' },
        reason: {
          type: 'string',
          description: 'Why this needs the founder personally',
        },
      },
      required: ['contact', 'reason'],
    },
  },
];

function asObj(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

export interface ToolOutcome {
  result: string; // text returned to the model as the tool_result
  event?: TwinEvent; // surfaced to the operator/UI
}

// Execute a tool the model requested. Returns a string result for the model
// plus an optional event for the operator.
export function executeTool(name: string, input: unknown): ToolOutcome {
  const o = asObj(input);
  switch (name) {
    case 'capture_lead': {
      const lead = upsertLead(o as unknown as CaptureLeadInput);
      return {
        result: `Lead saved: ${lead.name} (${lead.contact}). Qualification: ${lead.status.toUpperCase()} (score ${lead.score}/100, budget=${lead.budget_band}, timeline=${lead.timeline}). ${
          lead.status === 'hot'
            ? 'Strong fit — move toward booking a call.'
            : lead.status === 'warm'
              ? 'Promising — keep qualifying.'
              : 'Low signal — keep it light, nurture only.'
        }`,
        event: { type: 'lead_captured', lead },
      };
    }
    case 'book_call': {
      const contact = String(o.contact ?? '');
      const name = String(o.name ?? 'there');
      markBooked(contact);
      return {
        result: `Share this booking link with ${name}: ${CONFIG.agency.bookingLink} . Tell them to grab any slot that works; ${CONFIG.agency.founder} will be on the call.`,
        event: { type: 'call_booked', name, contact },
      };
    }
    case 'escalate_to_human': {
      const contact = String(o.contact ?? '');
      const reason = String(o.reason ?? '');
      markEscalated(contact);
      return {
        result: `Escalated to ${CONFIG.agency.founder}. They'll personally follow up with ${contact}. Let the prospect know ${CONFIG.agency.founder} will reach out directly.`,
        event: { type: 'escalated', contact, reason },
      };
    }
    default:
      return { result: `Unknown tool: ${name}` };
  }
}
