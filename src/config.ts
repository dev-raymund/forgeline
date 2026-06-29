import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const moduleDir = dirname(fileURLToPath(import.meta.url)); // .../src
const rootDir = resolve(moduleDir, '..'); // project root

export const CONFIG = {
  models: {
    // Flagship for the twin — voice + sales reasoning quality matter most here.
    chat: process.env.TWIN_CHAT_MODEL ?? 'claude-opus-4-8',
    // Content generation also runs on the flagship (with thinking enabled).
    content: process.env.TWIN_CONTENT_MODEL ?? 'claude-opus-4-8',
    // Cheap/fast model available as a cost lever if you wire it in.
    fast: 'claude-haiku-4-5',
  },
  agency: {
    name: process.env.AGENCY_NAME ?? 'Your Agency',
    founder: process.env.FOUNDER_NAME ?? 'the founder',
    bookingLink: process.env.BOOKING_LINK ?? 'https://cal.com/your-handle/intro',
    timezone: process.env.TIMEZONE ?? 'Asia/Manila',
  },
  paths: {
    knowledgeDir: resolve(moduleDir, 'knowledge'),
    leadsFile: resolve(rootDir, 'data', 'leads.json'),
  },
} as const;
