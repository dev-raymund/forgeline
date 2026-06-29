import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { CONFIG } from './config';
import type { BudgetBand, Lead, LeadStatus, Timeline } from './types';

function loadAll(): Lead[] {
  if (!existsSync(CONFIG.paths.leadsFile)) return [];
  try {
    return JSON.parse(readFileSync(CONFIG.paths.leadsFile, 'utf8')) as Lead[];
  } catch {
    return [];
  }
}

function saveAll(leads: Lead[]): void {
  mkdirSync(dirname(CONFIG.paths.leadsFile), { recursive: true });
  writeFileSync(CONFIG.paths.leadsFile, JSON.stringify(leads, null, 2));
}

// Deterministic qualification: budget + timeline + contactability + clarity of need.
// The model supplies the signals; scoring stays in code so it's auditable and stable.
export function scoreLead(input: {
  budget_band: BudgetBand;
  timeline: Timeline;
  contact?: string;
  need?: string;
}): { score: number; status: LeadStatus } {
  const budgetPts: Record<BudgetBand, number> = {
    unknown: 5,
    under_1k: 10,
    '1k_5k': 25,
    '5k_15k': 35,
    '15k_plus': 40,
  };
  const timelinePts: Record<Timeline, number> = {
    unknown: 5,
    exploring: 10,
    this_quarter: 25,
    now: 35,
  };

  let score = budgetPts[input.budget_band] + timelinePts[input.timeline];
  if (input.contact) score += 15;
  if (input.need) score += 10;
  score = Math.max(0, Math.min(100, score));

  const status: LeadStatus = score >= 65 ? 'hot' : score >= 40 ? 'warm' : 'cold';
  return { score, status };
}

export interface CaptureLeadInput {
  name: string;
  contact: string;
  company?: string;
  need?: string;
  budget_band?: BudgetBand;
  timeline?: Timeline;
  fit_notes?: string;
}

// Insert or update a lead keyed by contact, recompute score/status.
export function upsertLead(input: CaptureLeadInput): Lead {
  const leads = loadAll();
  const now = new Date().toISOString();
  const budget_band = input.budget_band ?? 'unknown';
  const timeline = input.timeline ?? 'unknown';
  const { score, status } = scoreLead({
    budget_band,
    timeline,
    contact: input.contact,
    need: input.need,
  });

  const existing = leads.find(
    (l) => l.contact.toLowerCase() === input.contact.toLowerCase(),
  );

  if (existing) {
    Object.assign(existing, {
      name: input.name || existing.name,
      company: input.company ?? existing.company,
      need: input.need ?? existing.need,
      budget_band,
      timeline,
      fit_notes: input.fit_notes ?? existing.fit_notes,
      score,
      status,
      updatedAt: now,
    });
    saveAll(leads);
    return existing;
  }

  const lead: Lead = {
    id: randomUUID(),
    name: input.name,
    contact: input.contact,
    company: input.company,
    need: input.need,
    budget_band,
    timeline,
    fit_notes: input.fit_notes,
    score,
    status,
    escalated: false,
    booked: false,
    createdAt: now,
    updatedAt: now,
  };
  leads.push(lead);
  saveAll(leads);
  return lead;
}

export function markBooked(contact: string): void {
  const leads = loadAll();
  const lead = leads.find(
    (l) => l.contact.toLowerCase() === contact.toLowerCase(),
  );
  if (lead) {
    lead.booked = true;
    lead.updatedAt = new Date().toISOString();
    saveAll(leads);
  }
}

export function markEscalated(contact: string): void {
  const leads = loadAll();
  const lead = leads.find(
    (l) => l.contact.toLowerCase() === contact.toLowerCase(),
  );
  if (lead) {
    lead.escalated = true;
    lead.updatedAt = new Date().toISOString();
    saveAll(leads);
  }
}

export function listLeads(): Lead[] {
  return loadAll().sort((a, b) => b.score - a.score);
}
