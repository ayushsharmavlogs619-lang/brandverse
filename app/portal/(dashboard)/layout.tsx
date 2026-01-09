import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                    {/* Background glow for ambience */}
                    <div className="fixed top-0 left-0 w-full h-full bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" />
                    <div className="fixed top-20 right-20 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

                    <div className="relative z-10 max-w-7xl mx-auto pb-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
