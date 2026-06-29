export type LeadStatus = 'hot' | 'warm' | 'cold';

export type BudgetBand =
  | 'unknown'
  | 'under_1k'
  | '1k_5k'
  | '5k_15k'
  | '15k_plus';

export type Timeline = 'unknown' | 'exploring' | 'this_quarter' | 'now';

export interface Lead {
  id: string;
  name: string;
  contact: string; // email or social handle
  company?: string;
  need?: string;
  budget_band: BudgetBand;
  timeline: Timeline;
  fit_notes?: string;
  score: number; // 0-100
  status: LeadStatus;
  escalated: boolean;
  booked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Side-effects the twin produced during a turn, surfaced to the UI/operator.
export type TwinEvent =
  | { type: 'lead_captured'; lead: Lead }
  | { type: 'call_booked'; name: string; contact: string }
  | { type: 'escalated'; contact: string; reason: string };
