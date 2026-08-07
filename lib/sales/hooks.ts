/**
 * BRANDVERSE SALES SYSTEM — React hook for localStorage-backed collections.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { loadCollection, saveCollection } from './storage';

export function useCollection<T extends { id: string }>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setItems(loadCollection<T>(key));
    } finally {
      setLoaded(true);
    }
  }, [key]);

  const persist = useCallback(
    (next: T[] | ((prev: T[]) => T[])) => {
      setItems((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T[]) => T[])(prev) : next;
        saveCollection(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  const add = useCallback(
    (item: T) => {
      persist((prev) => [item, ...prev]);
      return item.id;
    },
    [persist]
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      persist((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    },
    [persist]
  );

  const remove = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((i) => i.id !== id));
    },
    [persist]
  );

  const replaceAll = useCallback(
    (items: T[]) => {
      persist(items);
    },
    [persist]
  );

  return { items, loaded, add, update, remove, replaceAll };
}

export type CollectionApi<T extends { id: string }> = {
  items: T[];
  loaded: boolean;
  add: (item: T) => string;
  update: (id: string, patch: Partial<T>) => void;
  remove: (id: string) => void;
  replaceAll: (items: T[]) => void;
};
