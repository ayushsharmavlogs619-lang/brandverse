'use client';

import { useRef, useState } from 'react';
import {
  ChevronRight,
  Download,
  Edit3,
  Globe,
  LayoutGrid,
  List,
  MapPin,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import type { LeadStage } from '@/lib/sales/types';
import { LEAD_STAGES, LEAD_STAGE_META } from '@/lib/sales/types';
import { useLeads } from '@/lib/sales/useLeads';
import { exportJson } from '@/lib/sales/storage';
import { formatRelative, isOverdue, daysInStage } from '@/lib/crm/format';
import LeadForm from './components/LeadForm';
import { EmptyState, StatusChip } from '@/app/crm/components/ui';

type ViewMode = 'board' | 'table';

export default function ProspectingPage() {
  const leads = useLeads();
  const [view, setView] = useState<ViewMode>('board');
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null as null | ReturnType<typeof useLeads>['leads'][number]);
  const [confirmClear, setConfirmClear] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const dragIdRef = useRef<string | null>(null);

  if (!leads.loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const filtered = leads.leads.filter((l) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [l.business, l.owner, l.niche, l.city, l.state, l.country, l.email, l.phone, l.website]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });

  const byStage = (stage: LeadStage) => filtered.filter((l) => l.stage === stage);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const count = leads.importLeads(text);
      showToast(`Imported ${count} leads`);
    } catch (e) {
      showToast(e instanceof Error ? `Import failed: ${e.message}` : 'Import failed');
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent, stage: LeadStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || dragIdRef.current;
    dragIdRef.current = null;
    if (id) {
      leads.setStage(id, stage);
      showToast(`Moved to ${LEAD_STAGE_META[stage].label}`);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm shadow-2xl animate-fade-in">
          {toast}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Local Business <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Pipeline</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {leads.leads.length} leads tracked · {leads.leads.filter((l) => l.stage === 'won').length} won
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads…"
              className="w-56 bg-zinc-900/70 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
            />
          </div>

          <div className="flex bg-zinc-900/70 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setView('board')}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${view === 'board' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Board
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${view === 'table' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <List className="w-4 h-4" /> Table
            </button>
          </div>

          <button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => exportJson(`brandverse-leads-backup-${new Date().toISOString().slice(0, 10)}.json`, leads.leads)}
              title="Export leads (JSON)"
              className="w-9 h-9 rounded-xl bg-zinc-900/70 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              title="Import leads (JSON)"
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
                  leads.clearAll();
                  setConfirmClear(false);
                  showToast('All leads cleared');
                }}
                className="h-9 rounded-xl px-3 text-xs font-bold bg-red-600 text-white hover:bg-red-500 transition-colors"
              >
                Confirm?
              </button>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                title="Clear all leads"
                className="w-9 h-9 rounded-xl bg-zinc-900/70 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {leads.sampleData && (
        <div className="flex items-center justify-between gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-emerald-300">
          <p>Sample leads loaded so the pipeline isn&apos;t empty. Import your own data or clear all to start fresh.</p>
          <button
            onClick={() => leads.clearAll()}
            className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5 hover:bg-emerald-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear samples
          </button>
        </div>
      )}

      {view === 'board' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          {LEAD_STAGES.map((stage) => {
            const cards = byStage(stage);
            return (
              <div
                key={stage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, stage)}
                className={`flex-shrink-0 w-[280px] rounded-2xl border border-white/10 bg-[#0a0a0f] flex flex-col border-t-2 ${LEAD_STAGE_META[stage].columnHeader}`}
              >
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${LEAD_STAGE_META[stage].dot}`} />
                    <span className="text-sm font-bold">{LEAD_STAGE_META[stage].label}</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-semibold bg-white/5 rounded-full px-2 py-0.5">{cards.length}</span>
                </div>
                <div className="flex flex-col gap-2.5 px-3 pb-3 min-h-[120px]">
                  {cards.length === 0 && (
                    <div className="flex-1 border border-dashed border-white/10 rounded-xl text-center text-xs text-zinc-600 py-6">
                      Drop here
                    </div>
                  )}
                  {cards.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onDragStart={() => {
                        dragIdRef.current = lead.id;
                      }}
                      onEdit={() => {
                        setEditing(lead);
                        setFormOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 font-semibold">Business</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 font-semibold">Niche</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Revenue</th>
                <th className="px-4 py-3 font-semibold">Next Follow-up</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12">
                    <EmptyState
                      title="No leads found"
                      blurb="Add your first local business or adjust your search."
                      action={
                        <button
                          onClick={() => {
                            setEditing(null);
                            setFormOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold text-white"
                        >
                          <Plus className="w-4 h-4" /> Add Lead
                        </button>
                      }
                    />
                  </td>
                </tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{l.business}</p>
                    <p className="text-xs text-zinc-500">{l.website || '—'}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StagePill stage={l.stage} />
                      <StatusChip status={l.status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{l.niche}</td>
                  <td className="px-4 py-3">
                    {l.rating ? (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" /> {l.rating.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {[l.city, l.state, l.country].filter(Boolean).join(', ') || '—'}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{l.owner || '—'}</td>
                  <td className="px-4 py-3">
                    {l.phone ? <a href={`tel:${l.phone}`} className="text-blue-400 hover:underline">{l.phone}</a> : <span className="text-zinc-600">—</span>}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {l.revenue ? `$${l.revenue.toLocaleString()}/mo` : <span className="text-zinc-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${isOverdue(l.nextFollowUp) ? 'text-red-400' : 'text-zinc-300'}`}>
                      {formatRelative(l.nextFollowUp)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Edit"
                        onClick={() => {
                          setEditing(l);
                          setFormOpen(true);
                        }}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Website"
                        onClick={() => l.website && window.open(`https://${l.website.replace(/^https?:\/\//, '')}`, '_blank')}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => {
                          leads.deleteLead(l.id);
                          showToast(`${l.business} deleted`);
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
        <EmptyState title="No leads match your search" blurb="Try a different search term or add a new local business to the pipeline." />
      )}

      <LeadForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        lead={editing}
        onSave={(input, id) => {
          if (id) {
            leads.updateLead(id, input);
            showToast('Lead updated');
          } else {
            leads.addLead(input);
            showToast('Lead added');
          }
        }}
      />
    </div>
  );
}

function LeadCard({ lead, onDragStart, onEdit }: { lead: ReturnType<typeof useLeads>['leads'][number]; onDragStart: () => void; onEdit: () => void }) {
  const overdue = isOverdue(lead.nextFollowUp);
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', lead.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart();
      }}
      className="group relative block bg-zinc-900/60 border border-white/10 rounded-xl p-3.5 hover:border-emerald-500/40 hover:bg-zinc-900 hover:shadow-lg hover:shadow-emerald-600/10 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{lead.business}</p>
          <p className="text-[11px] text-zinc-500 truncate flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" />
            {[lead.city, lead.state].filter(Boolean).join(', ') || lead.niche}
          </p>
        </div>
        <StatusChip status={lead.status} />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
        <span className="text-zinc-400">{lead.niche}</span>
        {lead.rating && (
          <span className="inline-flex items-center gap-0.5 text-amber-400">
            <Star className="w-3 h-3 fill-current" /> {lead.rating.toFixed(1)}
          </span>
        )}
        {lead.owner && <span className="text-zinc-500">{lead.owner}</span>}
      </div>

      <div className="mt-2.5 space-y-1">
        {lead.nextFollowUp && (
          <p className={`text-[11px] font-medium ${overdue ? 'text-red-400' : 'text-zinc-400'}`}>
            Follow-up: {formatRelative(lead.nextFollowUp)}
          </p>
        )}
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">{daysInStage(lead.stageChangedAt)}d in stage</span>
          {lead.revenue ? (
            <span className="font-bold text-emerald-400">${lead.revenue.toLocaleString()}/mo</span>
          ) : (
            <span className="text-zinc-600">No deal yet</span>
          )}
        </div>
      </div>

      <button
        onClick={onEdit}
        title="Edit lead"
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function StagePill({ stage }: { stage: LeadStage }) {
  const meta = LEAD_STAGE_META[stage];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${meta.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
