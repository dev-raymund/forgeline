import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONFIG } from './config';

// Query-dependent knowledge. about.md and voice.md are always in the system
// prompt (see persona.ts); these larger fact files are retrieved on demand so
// the prompt stays small as the knowledge base grows.
const RETRIEVABLE_FILES = ['services.md', 'faq.md', 'case-studies.md'];

const STOPWORDS = new Set(
  'a an and the or but if then of to in on for with your you i we our us is are be do does how what when where which who can could would should will'.split(
    ' ',
  ),
);

interface Chunk {
  title: string;
  source: string;
  text: string;
  terms: Map<string, number>; // term frequency
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// Split a markdown file into chunks at "## " headings.
function chunkMarkdown(source: string, md: string): Chunk[] {
  const sections = md.split(/^##\s+/m);
  const chunks: Chunk[] = [];
  for (const section of sections) {
    const text = section.trim();
    if (!text) continue;
    const title = text.split('\n', 1)[0].trim();
    const terms = new Map<string, number>();
    for (const tok of tokenize(text)) terms.set(tok, (terms.get(tok) ?? 0) + 1);
    chunks.push({ title, source, text, terms });
  }
  return chunks;
}

let CACHE: { chunks: Chunk[]; idf: Map<string, number> } | null = null;

function index(): { chunks: Chunk[]; idf: Map<string, number> } {
  if (CACHE) return CACHE;
  const chunks: Chunk[] = [];
  for (const file of RETRIEVABLE_FILES) {
    const path = join(CONFIG.paths.knowledgeDir, file);
    if (!existsSync(path)) continue;
    chunks.push(...chunkMarkdown(file, readFileSync(path, 'utf8')));
  }

  // Inverse document frequency across chunks (BM25-lite weighting).
  const df = new Map<string, number>();
  for (const c of chunks) {
    for (const term of c.terms.keys()) df.set(term, (df.get(term) ?? 0) + 1);
  }
  const idf = new Map<string, number>();
  const n = Math.max(1, chunks.length);
  for (const [term, d] of df) idf.set(term, Math.log(1 + n / d));

  CACHE = { chunks, idf };
  return CACHE;
}

/**
 * Return the most relevant knowledge for a query as a single markdown string,
 * ready to drop into the system prompt. For a small knowledge base this returns
 * most chunks; the scoring exists so it scales as the KB grows. Swap in Voyage
 * embeddings here later for semantic retrieval — the interface stays the same.
 */
export function retrieve(query: string, k = 4): string {
  const { chunks, idf } = index();
  if (chunks.length === 0) return '';

  const qTerms = tokenize(query);
  const scored = chunks.map((c) => {
    let score = 0;
    for (const term of qTerms) {
      const tf = c.terms.get(term);
      if (tf) score += tf * (idf.get(term) ?? 0);
    }
    return { c, score };
  });

  // If nothing matched (e.g. a greeting), fall back to the highest-signal
  // chunks so the twin always has services/FAQ context to work with.
  const anyMatch = scored.some((s) => s.score > 0);
  const ranked = anyMatch
    ? scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score)
    : scored;

  return ranked
    .slice(0, k)
    .map((s) => `## ${s.c.title}\n\n${s.c.text.replace(/^.*\n/, '').trim()}`)
    .join('\n\n---\n\n');
}
