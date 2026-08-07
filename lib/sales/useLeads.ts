/**
 * BRANDVERSE PROSPECTING SYSTEM — leads hook.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BusinessLead, BusinessLeadInput, LeadStage } from './types';
import { clearLeads, leadsWereSeeded, loadLeads, saveCollection, uid } from './storage';
import { COLLECTIONS } from './storage';

export function useLeads() {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sampleData, setSampleData] = useState(false);

  useEffect(() => {
    try {
      setLeads(loadLeads());
      setSampleData(leadsWereSeeded());
    } finally {
      setLoaded(true);
    }
  }, []);

  const persist = useCallback((next: BusinessLead[] | ((prev: BusinessLead[]) => BusinessLead[])) => {
    setLeads((prev) => {
      const resolved = typeof next === 'function' ? (next as (p: BusinessLead[]) => BusinessLead[])(prev) : next;
      saveCollection(COLLECTIONS.leads, resolved);
      return resolved;
    });
  }, []);

  const addLead = useCallback(
    (input: BusinessLeadInput) => {
      const now = new Date().toISOString();
      const lead: BusinessLead = { ...input, id: uid(), createdAt: now, updatedAt: now, stageChangedAt: now };
      persist((prev) => [lead, ...prev]);
      setSampleData(false);
      return lead.id;
    },
    [persist]
  );

  const updateLead = useCallback(
    (id: string, patch: Partial<BusinessLead>) => {
      persist((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...patch, updatedAt: new Date().toISOString() } : l))
      );
    },
    [persist]
  );

  const deleteLead = useCallback(
    (id: string) => persist((prev) => prev.filter((l) => l.id !== id)),
    [persist]
  );

  const setStage = useCallback(
    (id: string, stage: LeadStage) => {
      const now = new Date().toISOString();
      persist((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                stage,
                stageChangedAt: now,
                status: stage === 'won' || stage === 'lost' ? 'closed' : l.status,
                updatedAt: now,
              }
            : l
        )
      );
    },
    [persist]
  );

  const importLeads = useCallback(
    (text: string): number => {
      const parsed = JSON.parse(text) as BusinessLead[];
      if (!Array.isArray(parsed)) throw new Error('File must be an array of leads');
      persist(parsed);
      setSampleData(false);
      return parsed.length;
    },
    [persist]
  );

  const clearAll = useCallback(() => {
    clearLeads();
    setLeads([]);
    setSampleData(false);
  }, []);

  return { leads, loaded, sampleData, addLead, updateLead, deleteLead, setStage, importLeads, clearAll };
}

export type LeadsApi = ReturnType<typeof useLeads>;

export function toLeadInput(lead: BusinessLead): BusinessLeadInput {
  const { id, createdAt, updatedAt, stageChangedAt, ...rest } = lead;
  void id;
  void createdAt;
  void updatedAt;
  void stageChangedAt;
  return rest;
}
