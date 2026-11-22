export default function HomePage() {
  return (
    <main id="top" className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <section className="relative overflow-hidden rounded-3xl border border-violet-400/40 bg-gradient-to-r from-indigo-950 via-slate-950 to-violet-950 p-5 shadow-2xl sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Support open source • Build the future</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Small contributions. <span className="text-violet-300">Big possibilities.</span></h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">Help fund independent open technology, developer tools and the QORVYNT vision. Every contribution is voluntary.</p>
              <a href="#donate" className="mt-5 inline-flex rounded-full bg-violet-500 px-6 py-3 font-bold text-white shadow-lg shadow-violet-950/60 transition hover:bg-violet-400">Explore the mission</a>
            </div>
            <img src="/crypto-daan-mascot.svg" alt="Crypto Daan cartoon mascot holding a Bitcoin coin and giving a thumbs up" className="mx-auto w-full max-w-[280px] drop-shadow-[0_0_28px_rgba(139,92,246,0.45)]" />
          </div>
        </section>
      </div>
      <section className="mx-auto mt-6 max-w-6xl px-4">
        <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 p-6 shadow-xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Long-term funding ambition</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">₹1 Lakh Crore</h2>
          <p className="mt-2 text-xl font-semibold text-violet-200">₹1,00,00,00,00,000</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">An ambitious long-term vision for building the wider QORVYNT technology ecosystem. This is not a verified estimate of current development costs or a claim about funds already raised. Any community support is voluntary.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div id="donate" className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Crypto Daan</p>
                <h2 className="mt-2 text-4xl font-bold">Support open technology.</h2>
              </div>
              
            </div>

            <div className="mb-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5" role="status">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Campaign status: pre-launch</p>
              <h2 className="mt-2 text-xl font-bold text-white">Please do not send cryptocurrency yet.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-200">Wallet control, network-specific test transfers and applicable legal and tax requirements are still being reviewed. Donation transfers are disabled until those checks are complete.</p>
              <p className="mt-3 text-xs text-amber-100">Verified asset and network instructions will be published before contributions open.</p>
            </div>

            <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300"><p className="font-semibold text-white">Payment controls are paused.</p><p className="mt-1">They will appear only after the campaign owner completes the required verification and explicitly enables contributions.</p></div>

            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="font-medium text-slate-200">Status:</p>
              <p className="mt-1">Contributions are not open. Please do not send funds.</p>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Get involved</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-4">
              <a href="https://github.com/vikash7644/crypto-daan" target="_blank" rel="noreferrer" className="inline-flex rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white hover:bg-violet-400">View project on GitHub ↗</a>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Partner & sponsor inquiries</p>
                <p className="mt-2 text-sm text-slate-200">Open a GitHub issue to discuss infrastructure, engineering, security review or ecosystem partnerships.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Notes</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Contributions are not currently being accepted.</li>
                  <li>No equity, ownership, tokens or financial returns are offered.</li>
                  <li>Progress and spending updates will be published when records are available.</li>
                </ul>
              </div>
            </div>
          </aside>
        </section>
      </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Transparency</p>
            <h2 className="mt-2 text-2xl font-bold">What support is intended to fund</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li><span className="font-semibold text-white">Software engineering</span> — compiler, language tooling and developer experience.</li>
              <li><span className="font-semibold text-white">Testing & security</span> — automated tests, independent review and responsible fixes.</li>
              <li><span className="font-semibold text-white">Infrastructure</span> — build, hosting, CI and release services.</li>
              <li><span className="font-semibold text-white">Documentation</span> — tutorials, examples and public project updates.</li>
            </ul>
            <p className="mt-4 text-xs text-slate-400">These are intended use categories, not a published budget or a claim that funds have been received.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Partnerships</p>
            <h2 className="mt-2 text-2xl font-bold">Build with us</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">We welcome conversations with developer communities, infrastructure providers, security researchers and organizations interested in open technology.</p>
            <a href="https://github.com/vikash7644/crypto-daan/issues/new" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full border border-violet-300/40 px-5 py-3 text-sm font-semibold text-violet-200 hover:bg-violet-400/10">Discuss a partnership on GitHub ↗</a>
          </div>
        </section>
        <footer className="mx-auto mt-8 max-w-6xl border-t border-white/10 px-4 py-6 text-xs leading-6 text-slate-400">
          Crypto Daan is a voluntary community-support campaign, not a registered charity or investment offer. Contributions do not provide equity, ownership, tokens, repayment or financial returns. Do not send funds until the campaign explicitly announces that verified payments are open.
          <div className="mt-2"><a className="text-cyan-300 underline" href="https://github.com/vikash7644/crypto-daan/blob/main/DONATE.md">Read donation safety & transparency details</a></div>
        </footer>
    </main>
  );
}
