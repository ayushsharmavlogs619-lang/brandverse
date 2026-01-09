import { Play, CheckCircle, XCircle, Phone, Clock, FileText } from 'lucide-react';

interface CallLog {
    id: number;
    status: 'Completed' | 'Missed';
    callerId: string;
    duration: string;
    outcome: 'Booked' | 'Qualified' | 'Spam';
    timestamp: string;
    recording: boolean;
}

export function CallPulseTable({ data }: { data: CallLog[] }) {
    const getOutcomeBadgeColor = (outcome: string) => {
        switch (outcome) {
            case 'Booked':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Qualified':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Spam':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    return (
        <div className="bg-[#020617] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Live Pulse Activity</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Live Feed</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-white/[0.02] border-b border-white/5">
                        <tr className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Caller ID</th>
                            <th className="px-8 py-4">Duration</th>
                            <th className="px-8 py-4">Outcome</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((call) => (
                            <tr key={call.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-3">
                                        {call.status === 'Completed' ? (
                                            <CheckCircle size={16} className="text-emerald-500" />
                                        ) : (
                                            <XCircle size={16} className="text-red-500" />
                                        )}
                                        <span className="text-sm font-bold text-white">{call.status}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-sm font-mono text-slate-400">{call.callerId}</td>
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <Clock size={12} />
                                        {call.duration}
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getOutcomeBadgeColor(call.outcome)}`}>
                                        {call.outcome}
                                    </span>
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                                            <FileText size={16} />
                                        </button>
                                        {call.recording && (
                                            <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg shadow-blue-500/20">
                                                <Play size={16} fill="currentColor" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
