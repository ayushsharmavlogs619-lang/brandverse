'use client'

import { useState, useRef, useEffect } from 'react';
import { chatAction } from './actions';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function WorkroomPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [modelType, setModelType] = useState<'pro' | 'flash' | 'cerebras'>('flash');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function handleSubmit(formData: FormData) {
        const userMessage = formData.get('message') as string;
        if (!userMessage.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        const result = await chatAction(formData);

        if (result.response) {
            setMessages(prev => [...prev, { role: 'ai', content: result.response! }]);
        } else if (result.error) {
            setMessages(prev => [...prev, { role: 'ai', content: `Error: ${result.error}` }]);
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col h-screen bg-[#050505] text-white font-sans">
            {/* Header */}
            <header className="p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">BRANDVERSE <span className="text-red-500 font-light underline decoration-red-500/30">WAR ROOM</span></h1>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Unlimited Tactical AI • Active</p>
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-4 text-sm bg-zinc-900/50 px-2 py-1 rounded-full border border-white/5">
                    <button
                        onClick={() => setModelType('flash')}
                        className={`px-3 py-1 rounded-full transition-all ${modelType === 'flash' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Flash (Fast)
                    </button>
                    <button
                        onClick={() => setModelType('pro')}
                        className={`px-3 py-1 rounded-full transition-all ${modelType === 'pro' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Pro (Ultra)
                    </button>
                    <button
                        onClick={() => setModelType('cerebras')}
                        className={`px-3 py-1 rounded-full transition-all ${modelType === 'cerebras' ? 'bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Lightning (Cerebras)
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <main
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
            >
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                        <Bot size={64} className="text-red-500 mb-2 animate-bounce" />
                        <h2 className="text-2xl font-bold uppercase italic tracking-tighter">Welcome to the Inner Sanctum.</h2>
                        <p className="max-w-md font-bold text-zinc-400">The Season Ticket is active. No limits, no corporate restrictions. Just work.</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-red-600'}`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-zinc-900 border border-white/5 rounded-tl-none'} shadow-xl`}>
                                <p className="leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 items-center text-zinc-500 bg-zinc-900/30 px-4 py-2 rounded-full border border-white/5">
                            <Loader2 className="animate-spin" size={16} />
                            <span className="text-sm italic font-bold">Strategizing...</span>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer / Input */}
            <footer className="p-4 md:p-8 bg-gradient-to-t from-black to-transparent">
                <form action={handleSubmit} className="max-w-4xl mx-auto relative group">
                    <input type="hidden" name="modelType" value={modelType} />
                    <input
                        type="text"
                        name="message"
                        autoComplete="off"
                        placeholder="Plan your next move..."
                        className="w-full bg-zinc-900/80 border border-white/10 px-6 py-5 rounded-3xl pr-20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all placeholder:text-zinc-600 font-bold backdrop-blur-3xl"
                        required
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        aria-label="Send Message"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center hover:bg-red-500 active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-red-600/40"
                    >
                        {loading ? <Loader2 className="animate-spin text-white" /> : <Send size={20} className="text-white fill-current" />}
                    </button>
                </form>
                <div className="text-center text-[10px] text-zinc-600 mt-6 uppercase tracking-[0.3em] font-black">
                    Powered by Brandverse Engine • 2025 • Secured Transmission
                </div>
            </footer>
        </div>
    );
}
