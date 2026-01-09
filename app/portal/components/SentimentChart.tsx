'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SentimentData {
    name: string;
    value: number;
    color: string;
}

export function SentimentChart({ data }: { data: SentimentData[] }) {
    return (
        <div className="bg-[#020617] border border-white/10 rounded-[2rem] p-8 h-full">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Sentiment Analysis</h3>
            <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', padding: '12px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                            formatter={(value: number) => [`${value}%`, '']}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Analyzed</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                {data.map((item) => (
                    <div key={item.name} className="text-center">
                        <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{item.name}</p>
                        <p className="text-lg font-black text-white">{item.value}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
