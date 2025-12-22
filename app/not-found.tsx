import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-8xl font-black text-white">404</h1>
        <p className="text-xl text-slate-400 mt-4">Page not found — but we can help you get back on track.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">Home</Link>
          <Link href="/contact" className="px-6 py-3 border border-white/10 rounded-lg text-white">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
