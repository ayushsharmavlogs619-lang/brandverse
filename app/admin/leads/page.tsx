import fs from 'fs/promises';
import path from 'path';
import { adminDb } from '@/lib/firebase/admin';
import { Mail, Globe, Clock, User, MessageSquare, Trash2, CheckCircle } from 'lucide-react';

async function getLeads() {
    let allLeads: any[] = [];

    // 1. Get from Firestore
    try {
        const snapshot = await adminDb.collection('contact-submissions').orderBy('timestamp', 'desc').get();
        const firestoreLeads = snapshot.docs.map((doc: any) => ({ 
            id: doc.id, 
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate().toLocaleDateString() || 'N/A',
            source: 'firestore'
        }));
        allLeads = [...firestoreLeads];
    } catch (e) {
        console.error('Firestore leads check failed (keys likely missing).');
    }

    // 2. Get from local JSON
    try {
        const LEADS_FILE = path.join(process.cwd(), 'leads.json');
        const content = await fs.readFile(LEADS_FILE, 'utf-8');
        const localLeads = JSON.parse(content);
        allLeads = [...allLeads, ...localLeads];
    } catch (e) {
        // No local file yet
    }

    // Sort all by timestamp (simple string sort for now or better)
    return allLeads.sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1));
}

export default async function AdminLeadsPage() {
    const leads = await getLeads();

    return (
        <div className="p-8 max-w-6xl mx-auto text-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Mission <span className="text-blue-500 text-glow-blue">Intel</span></h1>
                    <p className="text-slate-400 mt-2 font-medium">Incoming deployment requests and tactical inquiries.</p>
                </div>
                <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
                    <span className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Active Receptions: {leads.length}</span>
                </div>
            </div>

            {leads.length === 0 ? (
                <div className="py-32 text-center bg-white/5 border border-white/10 rounded-[3rem] space-y-6">
                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-white/5">
                        <User className="w-10 h-10 text-slate-700" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-white uppercase italic">Zero Intel Received</h2>
                        <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">No one has attempted to breach the system yet. Start your outreach campaign.</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {leads.map((lead: any) => (
                        <div key={lead.id} className="group bg-[#020617] border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-32 h-32 text-blue-500" />
                            </div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center font-black text-blue-400 text-xl italic">
                                            {lead.firstName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{lead.firstName} {lead.lastName}</h3>
                                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                                                <Mail className="w-3.5 h-3.5" /> {lead.email}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <Globe className="w-3 h-3" /> Target Site
                                            </div>
                                            <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" className="text-blue-400 font-bold hover:underline truncate block">
                                                {lead.website || 'N/A'}
                                            </a>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <Clock className="w-3 h-3" /> Intercept Date
                                            </div>
                                            <p className="text-slate-300 font-bold">{lead.timestamp}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-blue-500/10">
                                        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 italic">Tactical Challenges / Message</div>
                                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                            {lead.message || "No intelligence provided."}
                                        </p>
                                    </div>
                                </div>

                                <div className="md:w-48 flex flex-row md:flex-col gap-3">
                                    <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95">
                                        <CheckCircle className="w-3.5 h-3.5" /> Archive
                                    </button>
                                    <button className="flex-1 px-4 py-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95">
                                        <Trash2 className="w-3.5 h-3.5" /> Purge
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
