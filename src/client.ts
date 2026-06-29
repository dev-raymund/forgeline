import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error(
    '\n  Missing ANTHROPIC_API_KEY.\n' +
      '  Copy .env.example to .env and add your key from https://platform.claude.com/\n',
  );
  process.exit(1);
}

// Reads ANTHROPIC_API_KEY from the environment.
export const client = new Anthropic();
