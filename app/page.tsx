"use client";

import { useState } from "react";

const donationsEnabled = process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true";

const assets = [
  { id: "BTC", name: "Bitcoin", network: "Bitcoin network", address: process.env.NEXT_PUBLIC_BTC_ADDRESS || "bc1p8xm6dpk7lcuq3ahrdzzkfwdrt5f6xhkmezdup4trj280djht53mq5k3rkd", note: "Send BTC only. Do not send wrapped BTC or tokens." },
  { id: "ETH", name: "Ethereum", network: "Ethereum mainnet", address: process.env.NEXT_PUBLIC_ETH_ADDRESS || "0xFb28ed92F3fDA5F5394091D909B9423A20736aB5", note: "Send ETH on Ethereum mainnet only." },
  { id: "BNB", name: "BNB", network: "BNB Smart Chain (BEP-20)", address: process.env.NEXT_PUBLIC_BNB_ADDRESS || "0xFb28ed92F3fDA5F5394091D909B9423A20736aB5", note: "Send BNB on BNB Smart Chain only." },
  { id: "SOL", name: "Solana", network: "Solana network", address: process.env.NEXT_PUBLIC_SOL_ADDRESS || "DydeUcxGuhPcWryskJBw3KfNceeK7LkCNmYPhLgzpg5v", note: "Send SOL on Solana network only." },
  { id: "USDT-ERC20", name: "USDT", network: "Ethereum (ERC-20)", address: process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS || "", note: "USDT ERC-20 only. Ethereum gas fees apply." },
  { id: "USDT-BEP20", name: "USDT", network: "BNB Smart Chain (BEP-20)", address: process.env.NEXT_PUBLIC_USDT_BEP20_ADDRESS || "", note: "USDT BEP-20 only. BNB gas fees apply." },
  { id: "USDT-SPL", name: "USDT", network: "Solana (SPL)", address: process.env.NEXT_PUBLIC_USDT_SOL_ADDRESS || "", note: "USDT SPL only. Solana network fees apply." },
];

export default function HomePage() {
  const [selectedId, setSelectedId] = useState("BTC");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const selected = assets.find((asset) => asset.id === selectedId) || assets[0];
  const configured = selected.address.trim().length > 0;

  async function copyAddress() {
    if (!configured || !donationsEnabled) return;
    try {
      await navigator.clipboard.writeText(selected.address);
      setCopied(true);
      setStatus("Address copied. Verify the first and last characters before sending.");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setStatus("Copy failed. Select and copy the address manually.");
    }
  }


  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#"><span className="brand-mark">✳</span><span>CRYPTO <b>DAAN</b></span></a>
        <div className="nav-links"><a href="#mission">Our mission</a><a href="#transparency">Transparency</a><a href="#contribute">Contribute</a></div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> A COMMUNITY-POWERED BUILD</div>
          <h1>One billion people.<br /><span>One dollar each.</span><br />A future we build together.</h1>
          <p className="hero-lede">Support open technology for the next generation: QORVYNT programming language, Web4 infrastructure and developer tools.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contribute">Choose a crypto <span>↗</span></a><a className="button button-quiet" href="#mission">Our mission</a></div>
          <p className="hero-note">Pre-launch. Do not send funds until payment opening is announced.</p>
        </div>
        <div className="goal-card"><div className="goal-card-top"><span>THE COMMUNITY GOAL</span><span className="goal-icon">✳</span></div><div className="goal-number">1B</div><div className="goal-label">people × $1</div><div className="goal-divider" /><div className="goal-total"><span>Long-term campaign ambition</span><strong>$1,000,000,000</strong></div><div className="goal-foot">An aspiration, not funds raised or a guaranteed outcome.</div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
      </section>

      <section className="principles"><div><span className="principle-icon">◎</span><b>Open participation</b><small>Support only if you choose.</small></div><div><span className="principle-icon">◇</span><b>Keep ownership</b><small>Contributions do not buy equity.</small></div><div><span className="principle-icon">↗</span><b>Public progress</b><small>Publish verified updates.</small></div></section>

      <section className="content-section" id="mission">
        <div className="section-heading"><div className="eyebrow">THE MISSION</div><h2>Build useful technology.<br /><span>Make it accessible.</span></h2><p>Community support will help fund development, infrastructure, testing, documentation and public releases.</p></div>
        <div className="mission-grid">
          <article className="mission-card"><span className="card-index">01 / LANGUAGE</span><div className="mission-symbol">⌘</div><h3>QORVYNT Lang</h3><p>An independent programming language, compiler, virtual machine and developer tools.</p><span className="card-tag">Developer foundation</span></article>
          <article className="mission-card"><span className="card-index">02 / WEB4</span><div className="mission-symbol">⌬</div><h3>QORVYNT Web4</h3><p>Agent coordination, decentralized identity, permissions and user-controlled data.</p><span className="card-tag">Open infrastructure</span></article>
          <article className="mission-card"><span className="card-index">03 / ECOSYSTEM</span><div className="mission-symbol">✳</div><h3>Tools & applications</h3><p>SDKs, examples, documentation and practical applications for builders.</p><span className="card-tag">For builders</span></article>
        </div>
      </section>

      <section className="contribute-section" id="contribute">
        <div className="contribute-copy"><div className="eyebrow">GLOBAL CRYPTO SUPPORT</div><h2>Choose your crypto.<br /><span>Support the build.</span></h2><p>Choose the exact asset and network below. Receiving addresses are shown for review; transfers remain disabled until the campaign is formally opened. The $1 idea is a suggested contribution concept; crypto amounts vary with exchange rates and network fees.</p><div className="wallet-safety"><span>⌑</span><p><b>Important safety check</b><br />Always match the coin and network. Never send BTC to an EVM address or USDT on a different network. Never share your seed phrase or private key.</p></div></div>
        <div className="donation-card">
          <div className="donation-card-heading"><div><span className="eyebrow">CRYPTO CONTRIBUTION</span><h3>Payment options preview</h3></div><span className="secure-mark">◇</span></div>
          <label className="field-label" htmlFor="asset">Coin and network</label>
          <select id="asset" className="asset-select" value={selectedId} onChange={(event) => { setSelectedId(event.target.value); setStatus(""); }}>
            <optgroup label="Native coins"><option value="BTC">BTC · Bitcoin</option><option value="ETH">ETH · Ethereum</option><option value="BNB">BNB · BNB Smart Chain</option><option value="SOL">SOL · Solana</option></optgroup>
            <optgroup label="USDT — select the exact network"><option value="USDT-ERC20">USDT · Ethereum (ERC-20)</option><option value="USDT-BEP20">USDT · BNB Smart Chain (BEP-20)</option><option value="USDT-SPL">USDT · Solana (SPL)</option></optgroup>
          </select>
          <div className="selected-asset"><div className="coin-symbol">{selected.id.startsWith("USDT") ? "₮" : selected.id === "BTC" ? "₿" : selected.id === "ETH" ? "Ξ" : selected.id === "BNB" ? "◆" : "◎"}</div><div><b>{selected.name}</b><small>{selected.network}</small></div><span className="network-pill">{selected.id}</span></div>
          {!configured ? <div className="setup-alert"><b>{selected.name} address not configured</b><span>Donations for this option are disabled until the owner adds and verifies the correct receiving address. No payment should be sent to an unverified address.</span></div> : <div className="address-box"><span>Campaign receiving address — supplied from Phantom wallet</span><code>{selected.address}</code><button className="button button-primary copy-button" onClick={copyAddress} type="button" disabled={!donationsEnabled}>{!donationsEnabled ? "Contributions not open" : copied ? "Copied ✓" : "Copy address"}</button></div>}
          <p className="network-warning">{selected.note}</p>
          <div className="status-message" role="status">{status || "Pre-launch: do not send funds until the campaign confirms that payments are open."}</div>
          <div className="pending-wallet">
            <span className="eyebrow">ADDITIONAL PHANTOM ADDRESS</span>
            <code>CrvhxxxYenSVM1p7DBymnTqhAxc9oipRtGKyNNwih4EY</code>
            <small>This address was also supplied from Phantom. Its exact asset and network are not confirmed yet, so it is displayed for transparency only. Do not send funds to it until the campaign labels it for a specific asset and network.</small>
          </div>
          <p className="form-disclaimer">This campaign is in pre-launch review. Do not transfer funds yet. Payment tracking, receipts and on-chain verification are not active; this website does not collect transaction hashes or donor emails.</p>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="eyebrow">QUESTIONS, ANSWERED</div>
        <h2>Before you support.</h2>
        <div className="faq-list">
          <details><summary>What will Crypto Daan support?</summary><p>Voluntary community support is intended for QORVYNT Lang, QORVYNT Web4, developer tools, software testing, documentation and infrastructure.</p></details>
          <details><summary>Is one dollar required?</summary><p>No. The one-dollar idea is a campaign concept, not a minimum, fixed contribution, or promise that any exchange-rate amount equals exactly one US dollar.</p></details>
          <details><summary>Has one billion dollars been raised?</summary><p>No. One billion dollars is a long-term campaign ambition. No verified total or supporter count is being claimed on this website.</p></details>
          <details><summary>Can I send crypto right now?</summary><p>No. The campaign is in pre-launch review. Do not transfer funds until the website explicitly announces that contributions are open and the exact asset/network has been verified.</p></details>
          <details><summary>Do contributors receive equity or financial returns?</summary><p>No. Contributions are voluntary support and do not provide equity, ownership, tokens, repayment, rewards, or guaranteed financial returns.</p></details>
          <details><summary>Can a confirmed crypto transfer be reversed?</summary><p>Usually not. Blockchain transfers are generally irreversible, so always verify the asset, network, address and amount before confirming.</p></details>
        </div>
      </section>

      <section className="transparency-section" id="transparency"><div><div className="eyebrow">TRUST IS EARNED</div><h2>Clear goals.<br /><span>Honest updates.</span></h2></div><div className="transparency-copy"><p>We will publish verified campaign totals, development milestones and plain-language spending reports. This site does not claim a verified supporter count or amount raised yet.</p><ul><li>No fabricated progress numbers.</li><li>Public wallet addresses and transaction records will be verifiable.</li><li>Material changes to campaign scope will be disclosed.</li></ul></div></section>

      <section className="share-section">
        <div>
          <div className="eyebrow">HELP THE COMMUNITY GROW</div>
          <h2>Share the vision.<br /><span>Invite more builders.</span></h2>
          <p>If you cannot contribute, sharing the campaign helps others discover the work. Contributions are not open yet; please share the vision, not a request to transfer funds today.</p>
        </div>
        <div className="share-actions">
          <a className="button button-primary" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent("Help build open technology with QORVYNT Lang and QORVYNT Web4. Crypto Daan: One billion people, one dollar each. Voluntary community support. Contributions are not open yet. Read the campaign: https://github.com/vikash7644/crypto-daan/blob/main/DONATE.md")}`}>Share on WhatsApp ↗</a>
          <a className="button button-quiet" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("One billion people. One dollar each. Help build open technology with QORVYNT Lang and QORVYNT Web4.")}&url=${encodeURIComponent("https://github.com/vikash7644/crypto-daan/blob/main/DONATE.md")}`}>Share on X ↗</a>
          <a className="campaign-details-link" href="https://github.com/vikash7644/crypto-daan/blob/main/DONATE.md" target="_blank" rel="noopener noreferrer">Read campaign details</a>
        </div>
      </section>

      <footer className="footer"><a className="brand" href="#"><span className="brand-mark">✳</span><span>CRYPTO <b>DAAN</b></span></a><p>Community support for open technology.</p><small>Crypto contributions are voluntary and generally irreversible after confirmation. They are not investments, deposits or purchases of equity, tokens, rewards or guaranteed returns. Donors must verify the asset, network, address and applicable local laws and taxes. No payment is confirmed by this website unless independently verified on-chain.</small><div className="footer-bottom"><span>© {new Date().getFullYear()} Crypto Daan</span><a href="#contribute">Contribute ↑</a></div></footer>
    </main>
  );
}
