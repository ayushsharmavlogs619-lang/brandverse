'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Download,
  Edit3,
  LayoutGrid,
  List,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import type { Creator, Stage } from '@/lib/crm/types';
import { STAGES, STAGE_META } from '@/lib/crm/types';
import { useCrm } from '@/lib/crm/useCrm';
import { exportCreatorsToJson } from '@/lib/crm/storage';
import { formatCompact, formatCurrency, formatDate, formatRelative, initials, isOverdue, daysInStage } from '@/lib/crm/format';
import CreatorForm from './components/CreatorForm';
import { EmptyState, StageBadge, StatusChip } from './components/ui';

type ViewMode = 'board' | 'table';

export default function CrmPage() {
  const crm = useCrm();
  const [view, setView] = useState<ViewMode>('board');
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Creator | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const dragIdRef = useRef<string | null>(null);

  if (!crm.loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const filtered = crm.creators.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const haystack = [c.name, c.platform, c.country, c.email, c.instagram, c.x, c.reddit, c.agency]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });

  const byStage = (stage: Stage) => filtered.filter((c) => c.stage === stage);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const count = crm.importCreators(text);
      showToast(`Imported ${count} creators`);
    } catch (e) {
      showToast(e instanceof Error ? `Import failed: ${e.message}` : 'Import failed');
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || dragIdRef.current;
    dragIdRef.current = null;
    if (id) {
      crm.setStage(id, stage);
      showToast(`Moved to ${STAGE_META[stage].label}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm shadow-2xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Creator <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Pipeline</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {crm.creators.length} creators tracked · {crm.creators.filter((c) => c.stage === 'won').length} won
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search creators…"
              className="w-56 bg-zinc-900/70 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
          </div>

          <div className="flex bg-zinc-900/70 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setView('board')}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${
                view === 'board' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Board
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${
                view === 'table' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <List className="w-4 h-4" /> Table
            </button>
          </div>

          <button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Creator
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => exportCreatorsToJson(crm.creators)}
              title="Export backup (JSON)"
              className="w-9 h-9 rounded-xl bg-zinc-900/70 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              title="Import backup (JSON)"
              className="w-9 h-9 rounded-xl bg-zinc-900/70 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImport(file);
              }}
            />
            {confirmClear ? (
              <button
                onClick={() => {
                  crm.clearAll();
                  setConfirmClear(false);
                  showToast('All creators cleared');
                }}
                className="h-9 rounded-xl px-3 text-xs font-bold bg-red-600 text-white hover:bg-red-500 transition-colors"
              >
                Confirm?
              </button>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                title="Clear all data"
                className="w-9 h-9 rounded-xl bg-zinc-900/70 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sample data banner */}
      {crm.sampleData && (
        <div className="flex items-center justify-between gap-3 bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3 text-sm text-blue-300">
          <p>Sample creators loaded so the pipeline isn&apos;t empty. Export a backup, import your own data, or clear all to start fresh.</p>
          <button
            onClick={() => crm.clearAll()}
            className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-1.5 hover:bg-blue-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear samples
          </button>
        </div>
      )}

      {/* Board */}
      {view === 'board' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          {STAGES.map((stage) => {
            const cards = byStage(stage);
            return (
              <div
                key={stage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, stage)}
                className={`flex-shrink-0 w-[280px] rounded-2xl border border-white/10 bg-[#0a0a0f] flex flex-col ${STAGE_META[stage].columnHeader.replace('border-', 'border-t-2 ')}`}
              >
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${STAGE_META[stage].dot}`} />
                    <span className="text-sm font-bold">{STAGE_META[stage].label}</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-semibold bg-white/5 rounded-full px-2 py-0.5">
                    {cards.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 px-3 pb-3 min-h-[120px]">
                  {cards.length === 0 && (
                    <div className="flex-1 border border-dashed border-white/10 rounded-xl text-center text-xs text-zinc-600 py-6">
                      Drop here
                    </div>
                  )}
                  {cards.map((creator) => (
                    <KanbanCard
                      key={creator.id}
                      creator={creator}
                      onDragStart={(id) => {
                        dragIdRef.current = id;
                      }}
                      onAdvance={() => {
                        crm.advanceStage(creator.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table */
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-x-auto">
          <table className="w-full text-sm min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 font-semibold">Creator</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">Followers</th>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Deal Value</th>
                <th className="px-4 py-3 font-semibold">Next Follow-up</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12">
                    <EmptyState
                      title="No creators found"
                      blurb="Add your first creator or adjust your search."
                      action={
                        <button
                          onClick={() => {
                            setEditing(null);
                            setFormOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
                        >
                          <Plus className="w-4 h-4" /> Add Creator
                        </button>
                      }
                    />
                  </td>
                </tr>
              )}
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/crm/creator?id=${c.id}`} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                        {initials(c.name)}
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-blue-300 transition-colors">{c.name}</p>
                        <p className="text-xs text-zinc-500">{c.agency || '—'}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StageBadge stage={c.stage} small />
                      <StatusChip status={c.status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{c.platform}</td>
                  <td className="px-4 py-3 text-zinc-300">{formatCompact(c.followers)}</td>
                  <td className="px-4 py-3 text-zinc-300">{c.country || '—'}</td>
                  <td className="px-4 py-3">
                    {c.email ? (
                      <a href={`mailto:${c.email}`} className="text-blue-400 hover:underline">
                        {c.email}
                      </a>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(c.dealValue)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${isOverdue(c.nextFollowUp) ? 'text-red-400' : 'text-zinc-300'}`}>
                      {formatRelative(c.nextFollowUp)}
                    </span>
                    <span className="block text-[10px] text-zinc-600">{formatDate(c.nextFollowUp)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/crm/creator?id=${c.id}`}
                        title="Profile"
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button
                        title="Edit"
                        onClick={() => {
                          setEditing(c);
                          setFormOpen(true);
                        }}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => {
                          crm.deleteCreator(c.id);
                          showToast(`${c.name} deleted`);
                        }}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'board' && filtered.length === 0 && (
        <EmptyState
          title="No creators match your search"
          blurb="Try a different search term or add a new creator to the pipeline."
        />
      )}

      <CreatorForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        creator={editing}
        onSave={(input, id) => {
          if (id) {
            crm.updateCreator(id, input);
            showToast('Creator updated');
          } else {
            crm.addCreator(input);
            showToast('Creator added');
          }
        }}
      />
    </div>
  );
}

function KanbanCard({
  creator,
  onDragStart,
  onAdvance,
}: {
  creator: Creator;
  onDragStart: (id: string) => void;
  onAdvance: () => void;
}) {
  const overdue = isOverdue(creator.nextFollowUp);
  const stageDays = daysInStage(creator.stageChangedAt);

  return (
    <Link
      href={`/crm/creator?id=${creator.id}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', creator.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(creator.id);
      }}
      className="group relative block bg-zinc-900/60 border border-white/10 rounded-xl p-3.5 hover:border-blue-500/40 hover:bg-zinc-900 hover:shadow-lg hover:shadow-blue-600/10 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">
            {initials(creator.name)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{creator.name}</p>
            <p className="text-[11px] text-zinc-500 truncate">
              {creator.platform}
              {creator.followers ? ` · ${formatCompact(creator.followers)}` : ''}
              {creator.country ? ` · ${creator.country}` : ''}
            </p>
          </div>
        </div>
        <StatusChip status={creator.status} />
      </div>

      <div className="mt-3 space-y-1.5">
        {creator.nextFollowUp && (
          <p className={`text-[11px] font-medium ${overdue ? 'text-red-400' : 'text-zinc-400'}`}>
            Follow-up: {formatRelative(creator.nextFollowUp)}
          </p>
        )}
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">{stageDays}d in stage</span>
          {creator.dealValue ? (
            <span className="font-bold text-emerald-400">{formatCurrency(creator.dealValue)}</span>
          ) : (
            <span className="text-zinc-600">No deal yet</span>
          )}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAdvance();
        }}
        title="Move to next stage"
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </Link>
  );
}
