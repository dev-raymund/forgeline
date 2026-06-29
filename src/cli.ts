import type Anthropic from '@anthropic-ai/sdk';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CONFIG } from './config';
import { listLeads } from './leads';
import type { ContentKind } from './persona';
import type { TwinEvent } from './types';
import { chatTurn, generateContent } from './twin';

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;

function printEvent(e: TwinEvent): void {
  if (e.type === 'lead_captured') {
    output.write(
      dim(
        `\n  · lead saved — ${e.lead.name} [${e.lead.status} ${e.lead.score}/100]\n`,
      ),
    );
  } else if (e.type === 'call_booked') {
    output.write(dim(`\n  · call booked — ${e.name}\n`));
  } else if (e.type === 'escalated') {
    output.write(dim(`\n  · escalated to ${CONFIG.agency.founder}\n`));
  }
}

function help(): void {
  output.write(
    [
      '',
      bold('Commands:'),
      '  /post <brief>      draft a LinkedIn post in your voice',
      '  /ig <brief>        draft an Instagram caption',
      '  /email <brief>     draft a nurture email',
      '  /dm <brief>        draft a cold outreach DM',
      '  /leads             show captured leads (qualification ranked)',
      '  /reset             start a fresh conversation',
      '  /help              show this',
      '  /exit              quit',
      '',
      dim('Anything else is treated as a prospect talking to your twin.'),
      '',
    ].join('\n'),
  );
}

const CONTENT_CMDS: Record<string, ContentKind> = {
  '/post': 'linkedin_post',
  '/ig': 'instagram_caption',
  '/email': 'email',
  '/dm': 'cold_dm',
};

async function main(): Promise<void> {
  const rl = readline.createInterface({ input, output });
  let history: Anthropic.MessageParam[] = [];

  output.write(
    `\n${bold(`${CONFIG.agency.name} — digital twin of ${CONFIG.agency.founder}`)}\n`,
  );
  output.write(dim(`model: ${CONFIG.models.chat}   type /help for commands\n\n`));

  while (true) {
    const line = (await rl.question(cyan('prospect ▸ '))).trim();
    if (!line) continue;

    if (line === '/exit' || line === '/quit') break;
    if (line === '/help') {
      help();
      continue;
    }
    if (line === '/reset') {
      history = [];
      output.write(dim('  · conversation reset\n\n'));
      continue;
    }
    if (line === '/leads') {
      const leads = listLeads();
      if (leads.length === 0) output.write(dim('  (no leads captured yet)\n\n'));
      for (const l of leads) {
        output.write(
          `  ${bold(l.status.toUpperCase().padEnd(4))} ${String(l.score).padStart(3)}/100  ${l.name} <${l.contact}>` +
            `${l.booked ? ' [booked]' : ''}${l.escalated ? ' [escalated]' : ''}\n`,
        );
      }
      output.write('\n');
      continue;
    }

    const cmd = line.split(' ', 1)[0];
    if (cmd in CONTENT_CMDS) {
      const brief = line.slice(cmd.length).trim();
      if (!brief) {
        output.write(dim(`  usage: ${cmd} <what the content is about>\n\n`));
        continue;
      }
      output.write(`\n${bold(`${CONFIG.agency.founder} (draft) ▸ `)}`);
      await generateContent(CONTENT_CMDS[cmd], brief, (d) => output.write(d));
      output.write('\n\n');
      continue;
    }

    // Default: a prospect message to the twin.
    output.write(`\n${bold(`${CONFIG.agency.founder} ▸ `)}`);
    try {
      const res = await chatTurn({
        history,
        userMessage: line,
        onText: (d) => output.write(d),
        onEvent: printEvent,
      });
      history = res.history;
    } catch (err) {
      output.write(dim(`\n  [error] ${(err as Error).message}\n`));
    }
    output.write('\n\n');
  }

  rl.close();
  output.write(dim('\nbye.\n'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
