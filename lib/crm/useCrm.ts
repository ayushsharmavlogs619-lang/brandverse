/**
 * BRANDVERSE CREATOR OUTREACH ENGINE — React state hook.
 * Single source of truth for CRM data in client components.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ConversationMessage, Creator, CreatorInput, FollowUpReminder, Stage } from './types';
import {
  addMessageToCreator,
  addReminderToCreator,
  clearAllCreators,
  createCreator,
  deleteReminder,
  loadCreators,
  parseCreatorsJson,
  saveCreators,
  toInput,
  toggleReminder,
} from './storage';

export function useCrm() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sampleData, setSampleData] = useState(false);

  useEffect(() => {
    try {
      const data = loadCreators();
      setCreators(data);
      setSampleData(data.length > 0);
    } finally {
      setLoaded(true);
    }
  }, []);

  const persist = useCallback((next: Creator[] | ((prev: Creator[]) => Creator[])) => {
    setCreators((prev) => {
      const resolved = typeof next === 'function' ? (next as (p: Creator[]) => Creator[])(prev) : next;
      saveCreators(resolved);
      return resolved;
    });
  }, []);

  const addCreator = useCallback(
    (input: CreatorInput) => {
      const creator = createCreator(input);
      persist((prev) => [creator, ...prev]);
      return creator.id;
    },
    [persist]
  );

  const updateCreator = useCallback(
    (id: string, patch: Partial<Creator>) => {
      persist((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c
        )
      );
    },
    [persist]
  );

  const deleteCreator = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((c) => c.id !== id));
    },
    [persist]
  );

  const setStage = useCallback(
    (id: string, stage: Stage) => {
      const now = new Date().toISOString();
      persist((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                stage,
                stageChangedAt: now,
                status: stage === 'won' || stage === 'lost' ? 'closed' : c.status,
                updatedAt: now,
              }
            : c
        )
      );
    },
    [persist]
  );

  const advanceStage = useCallback(
    (id: string) => {
      const order: Stage[] = ['prospect', 'contacted', 'replied', 'discovery', 'proposal', 'won', 'lost'];
      const creator = creators.find((c) => c.id === id);
      if (!creator) return;
      const idx = order.indexOf(creator.stage);
      if (idx < 0 || idx >= order.length - 1) return;
      setStage(id, order[idx + 1]);
    },
    [creators, setStage]
  );

  const addMessage = useCallback(
    (id: string, message: Omit<ConversationMessage, 'id' | 'date'>) => {
      persist((prev) => prev.map((c) => (c.id === id ? addMessageToCreator(c, message) : c)));
    },
    [persist]
  );

  const addReminder = useCallback(
    (id: string, reminder: Omit<FollowUpReminder, 'id' | 'completed'>) => {
      persist((prev) => prev.map((c) => (c.id === id ? addReminderToCreator(c, reminder) : c)));
    },
    [persist]
  );

  const toggleReminderDone = useCallback(
    (id: string, reminderId: string) => {
      persist((prev) => prev.map((c) => (c.id === id ? toggleReminder(c, reminderId) : c)));
    },
    [persist]
  );

  const removeReminder = useCallback(
    (id: string, reminderId: string) => {
      persist((prev) => prev.map((c) => (c.id === id ? deleteReminder(c, reminderId) : c)));
    },
    [persist]
  );

  const importCreators = useCallback(
    (text: string): number => {
      const parsed = parseCreatorsJson(text);
      persist(parsed);
      setSampleData(false);
      return parsed.length;
    },
    [persist]
  );

  const clearAll = useCallback(() => {
    clearAllCreators();
    setCreators([]);
    setSampleData(false);
  }, []);

  return {
    creators,
    loaded,
    sampleData,
    addCreator,
    updateCreator,
    deleteCreator,
    setStage,
    advanceStage,
    addMessage,
    addReminder,
    toggleReminderDone,
    removeReminder,
    importCreators,
    clearAll,
  };
}

export type CrmApi = ReturnType<typeof useCrm>;

export function getCreator(creators: Creator[], id: string | null): Creator | undefined {
  if (!id) return undefined;
  return creators.find((c) => c.id === id);
}

export { toInput };
