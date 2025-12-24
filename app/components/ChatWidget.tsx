'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Zap, User, Bot } from 'lucide-react';
import { chatAction } from '../workroom/actions';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: "Yo! I'm Erling, the fastest AI Voice Agent scout in the league. Want to see how fast I can automate your business?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        const formData = new FormData();
        formData.append('message', userMsg);
        formData.append('modelType', 'cerebras'); // Use Haaland speed for public demo

        try {
            const result = await chatAction(formData);
            if (result.response) {
                setMessages(prev => [...prev, { role: 'ai', content: result.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'ai', content: "The connection dropped! Try again." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: "Tactical error. Refresh the pitch." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Chat Bubble Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-zinc-800 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
                    }`}
            >
                {isOpen ? <X className="text-white w-8 h-8" /> : <MessageSquare className="text-white w-8 h-8" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-b border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="text-white w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <div className="text-white font-black text-sm uppercase tracking-widest">Brandverse AI</div>
                            <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Erling (Lightning Speed)
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-blue-900/50'}`}>
                                    {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-blue-400" />}
                                </div>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] leading-relaxed font-medium ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10'
                                        : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-blue-500/20"
                        >
                            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
