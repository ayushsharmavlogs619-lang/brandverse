export default function LivePulsePage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full bg-blue-500" />
            </div>
            <h1 className="text-4xl font-black text-white uppercase italic">Live Pulse Feed</h1>
            <p className="text-slate-400 font-bold">Real-time socket connection establishing...</p>
        </div>
    )
}
