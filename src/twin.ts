import type Anthropic from '@anthropic-ai/sdk';
import { client } from './client';
import { CONFIG } from './config';
import {
  buildChatSystem,
  buildContentSystem,
  type ContentKind,
} from './persona';
import { retrieve } from './retrieval';
import { executeTool, TOOLS } from './tools';
import type { TwinEvent } from './types';

const MAX_TOOL_STEPS = 6;

export interface ChatTurnOptions {
  history: Anthropic.MessageParam[];
  userMessage: string;
  onText?: (delta: string) => void; // stream the reply token-by-token
  onEvent?: (event: TwinEvent) => void; // tool side-effects as they happen
}

export interface ChatTurnResult {
  reply: string;
  history: Anthropic.MessageParam[];
}

/**
 * Run one user turn through the twin: a manual streaming agentic loop that lets
 * the model call lead tools as many times as needed before it answers.
 */
export async function chatTurn(opts: ChatTurnOptions): Promise<ChatTurnResult> {
  const system = buildChatSystem(retrieve(opts.userMessage));
  const messages: Anthropic.MessageParam[] = [
    ...opts.history,
    { role: 'user', content: opts.userMessage },
  ];

  for (let step = 0; step < MAX_TOOL_STEPS; step++) {
    const stream = client.messages.stream({
      model: CONFIG.models.chat,
      max_tokens: 1500,
      system,
      tools: TOOLS,
      messages,
    });
    if (opts.onText) stream.on('text', opts.onText);

    const message = await stream.finalMessage();
    messages.push({ role: 'assistant', content: message.content });

    if (message.stop_reason !== 'tool_use') {
      const reply = message.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      return { reply, history: messages };
    }

    // Execute every tool call and return all results in one user message.
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of message.content) {
      if (block.type === 'tool_use') {
        const { result, event } = executeTool(block.name, block.input);
        if (event && opts.onEvent) opts.onEvent(event);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: result,
        });
      }
    }
    messages.push({ role: 'user', content: toolResults });
  }

  return {
    reply:
      "Let me get the founder to follow up with you directly on this — I don't want to keep you waiting.",
    history: messages,
  };
}

/**
 * Draft marketing content in the founder's voice. Uses adaptive thinking +
 * high effort for quality; streams the draft if onText is provided.
 */
export async function generateContent(
  kind: ContentKind,
  brief: string,
  onText?: (delta: string) => void,
): Promise<string> {
  const stream = client.messages.stream({
    model: CONFIG.models.content,
    max_tokens: 2000,
    system: buildContentSystem(kind),
    messages: [
      {
        role: 'user',
        content: `Brief: ${brief}\n\nWrite the ${kind.replace('_', ' ')} now.`,
      },
    ],
  });

  if (onText) stream.on('text', onText);

  const message = await stream.finalMessage();
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
}
