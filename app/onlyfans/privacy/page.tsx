export const metadata = { title: "Creator Privacy Notice | Brandverse", robots: { index: false } };

export default function CreatorPrivacyNotice() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 px-6 py-20">
      <article className="max-w-3xl mx-auto space-y-8">
        <a href="/onlyfans/" className="text-indigo-300 underline">← Back to creator operations</a>
        <h1 className="text-4xl font-bold text-white">Creator Privacy Notice</h1>
        <p className="text-slate-400">This notice explains what happens when you submit the OnlyFans creator-operations inquiry form.</p>
        <section className="space-y-3"><h2 className="text-xl font-semibold text-white">Information and purpose</h2><p>We may receive the name, email address, monthly-revenue range, creator profile URL, and message you choose to provide. We use these details to review your inquiry, assess fit, and respond. Do not submit passwords, account credentials, payment details, or intimate images or content.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold text-white">Form processing</h2><p>The form sends submitted details to the configured Google Sheets and FormSubmit processing services. If those services cannot accept the submission, the site may retain the inquiry in this browser’s local storage and open a prefilled email draft. That draft is not sent automatically; you decide whether to send it.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold text-white">Your choices and questions</h2><p>You can choose not to submit the form. To ask about, correct, or request deletion of an inquiry, email <a className="text-indigo-300 underline" href="mailto:ayush@brandverse.tech">ayush@brandverse.tech</a> from the address used in your inquiry. We will make reasonable efforts to locate it across the systems used for processing.</p></section>
        <p className="text-sm text-slate-500">This notice covers the inquiry form only. It does not describe the privacy practices of OnlyFans or other third-party services.</p>
      </article>
    </main>
  );
}
