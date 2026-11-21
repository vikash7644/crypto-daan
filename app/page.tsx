"use client";

import { useCallback, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const DONATION_ADDRESS = process.env.NEXT_PUBLIC_DONATION_ADDRESS || "";
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://polygon-rpc.com";
const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL || "https://polygonscan.com/address/";
const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)",
];

const walletConfigured =
  ethers.isAddress(DONATION_ADDRESS) &&
  DONATION_ADDRESS !== ethers.ZeroAddress;

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState("1");
  const [mode, setMode] = useState<"NATIVE" | "TOKEN">("NATIVE");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("TOKEN");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [nativeBalance, setNativeBalance] = useState("—");
  const [tokenBalance, setTokenBalance] = useState("—");
  const [status, setStatus] = useState("Choose an amount and connect your wallet to contribute.");

  const refreshBalances = useCallback(async () => {
    if (!walletConfigured) return;
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const balance = await provider.getBalance(DONATION_ADDRESS);
      setNativeBalance(Number(ethers.formatEther(balance)).toFixed(4));
      if (mode === "TOKEN" && ethers.isAddress(tokenAddress)) {
        const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const [symbol, decimals, rawBalance] = await Promise.all([
          token.symbol().catch(() => "TOKEN"),
          token.decimals().catch(() => 18),
          token.balanceOf(DONATION_ADDRESS),
        ]);
        const safeDecimals = Number(decimals);
        setTokenSymbol(String(symbol || "TOKEN"));
        setTokenDecimals(Number.isInteger(safeDecimals) && safeDecimals >= 0 && safeDecimals <= 36 ? safeDecimals : 18);
        setTokenBalance(ethers.formatUnits(rawBalance, safeDecimals));
      } else {
        setTokenBalance("—");
      }
    } catch {
      setNativeBalance("Unavailable");
      setTokenBalance("Unavailable");
    }
  }, [mode, tokenAddress]);

  useEffect(() => {
    void refreshBalances();
  }, [refreshBalances]);

  async function detectToken() {
    if (!ethers.isAddress(tokenAddress)) {
      setStatus("Enter a valid token contract address on the connected network.");
      return;
    }
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const [symbol, decimals] = await Promise.all([token.symbol(), token.decimals()]);
      const safeDecimals = Number(decimals);
      if (!Number.isInteger(safeDecimals) || safeDecimals < 0 || safeDecimals > 36) {
        throw new Error("Unsupported token decimals.");
      }
      setTokenSymbol(String(symbol));
      setTokenDecimals(safeDecimals);
      setStatus(`Detected ${String(symbol)}. Check the token and network before donating.`);
    } catch {
      setStatus("Token could not be verified on the configured network. Check the address and try again.");
    }
  }

  async function donate() {
    if (!walletConfigured) {
      setStatus("Donations are not enabled yet: the campaign wallet has not been configured.");
      return;
    }
    if (!isConnected || !address) {
      setStatus("Connect your wallet first.");
      return;
    }
    if (!amount.trim() || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setStatus("Enter a valid amount greater than zero.");
      return;
    }
    if (!(window as any).ethereum) {
      setStatus("No compatible browser wallet was found. Open this site in your wallet app.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      if (mode === "NATIVE") {
        setStatus("Please confirm the native-coin transfer in your wallet…");
        const tx = await signer.sendTransaction({
          to: DONATION_ADDRESS,
          value: ethers.parseEther(amount),
        });
        setStatus(`Transaction submitted: ${tx.hash}. Waiting for confirmation…`);
        await tx.wait();
        setStatus("Contribution confirmed. Thank you for supporting the project!");
      } else {
        if (!ethers.isAddress(tokenAddress)) {
          setStatus("Enter and verify a token contract address first.");
          return;
        }
        const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const tx = await token.transfer(DONATION_ADDRESS, ethers.parseUnits(amount, tokenDecimals));
        setStatus(`Transaction submitted: ${tx.hash}. Waiting for confirmation…`);
        await tx.wait();
        setStatus(`${tokenSymbol} contribution confirmed. Thank you!`);
      }
      setAmount("1");
      await refreshBalances();
    } catch (error: any) {
      setStatus(error?.shortMessage || error?.reason || error?.message || "The transaction was not completed.");
    }
  }

  async function copyAddress() {
    if (!walletConfigured) return;
    try {
      await navigator.clipboard.writeText(DONATION_ADDRESS);
      setStatus("Campaign wallet address copied.");
    } catch {
      setStatus("Could not copy automatically. Select the wallet address to copy it.");
    }
  }

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#" aria-label="Crypto Daan home">
          <span className="brand-mark">₿</span>
          <span>CRYPTO <b>DAAN</b></span>
        </a>
        <div className="nav-links">
          <a href="#mission">Our mission</a>
          <a href="#transparency">Transparency</a>
          <a href="#contribute">Contribute</a>
        </div>
        <div className="nav-wallet"><ConnectButton showBalance={false} /></div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> A COMMUNITY-POWERED BUILD</div>
          <h1>One billion people.<br /><span>One dollar each.</span><br />A future we build together.</h1>
          <p className="hero-lede">
            Help build open technology for the next generation: QORVYNT programming language,
            Web4 infrastructure and tools that put creation in more people’s hands.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contribute">Support the mission <span>↗</span></a>
            <a className="button button-quiet" href="#mission">See what we’re building</a>
          </div>
          <p className="hero-note">Voluntary support. No equity. No ownership or financial return promised.</p>
        </div>
        <div className="goal-card">
          <div className="goal-card-top"><span>THE COMMUNITY GOAL</span><span className="goal-icon">✳</span></div>
          <div className="goal-number">1B</div>
          <div className="goal-label">people × $1</div>
          <div className="goal-divider" />
          <div className="goal-total"><span>Illustrative campaign ambition</span><strong>$1,000,000,000</strong></div>
          <div className="goal-foot">A long-term aspiration, not money raised or a guaranteed outcome.</div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        </div>
      </section>

      <section className="principles" aria-label="Campaign principles">
        <div><span className="principle-icon">◎</span><b>Open participation</b><small>Support only if you choose.</small></div>
        <div><span className="principle-icon">◇</span><b>Keep ownership</b><small>Contributions do not buy equity.</small></div>
        <div><span className="principle-icon">↗</span><b>Public progress</b><small>Publish milestones and spending updates.</small></div>
      </section>

      <section className="content-section" id="mission">
        <div className="section-heading">
          <div className="eyebrow">THE MISSION</div>
          <h2>Build useful technology.<br /><span>Make it accessible.</span></h2>
          <p>This campaign brings supporters together around a shared technology vision. Contributions will help fund development, infrastructure, testing, documentation and public releases.</p>
        </div>
        <div className="mission-grid">
          <article className="mission-card"><span className="card-index">01 / LANGUAGE</span><div className="mission-symbol">⌘</div><h3>QORVYNT Lang</h3><p>An independent programming language, compiler, virtual machine and developer tools.</p><span className="card-tag">Developer foundation</span></article>
          <article className="mission-card"><span className="card-index">02 / WEB4</span><div className="mission-symbol">⌬</div><h3>QORVYNT Web4</h3><p>Exploring agent coordination, decentralized identity, permissions and user-controlled data.</p><span className="card-tag">Open infrastructure</span></article>
          <article className="mission-card"><span className="card-index">03 / ECOSYSTEM</span><div className="mission-symbol">✳</div><h3>Tools & applications</h3><p>SDKs, examples, documentation and practical applications built around the technology.</p><span className="card-tag">For builders</span></article>
        </div>
      </section>

      <section className="contribute-section" id="contribute">
        <div className="contribute-copy">
          <div className="eyebrow">BE PART OF THE FIRST STEPS</div>
          <h2>Every contribution<br /><span>helps us build.</span></h2>
          <p>The $1 idea is an invitation, not a fixed price. You can choose any amount supported by your wallet. Network fees are charged by the blockchain and are separate from your contribution.</p>
          <div className="wallet-safety"><span>⌑</span><p><b>Wallet safety</b><br />Your wallet will show the destination and amount before you approve. Never share your seed phrase or private key.</p></div>
        </div>

        <div className="donation-card">
          <div className="donation-card-heading"><div><span className="eyebrow">CRYPTO CONTRIBUTION</span><h3>Support the build</h3></div><span className="secure-mark">◇</span></div>
          {!walletConfigured && <div className="setup-alert"><b>Campaign wallet not configured</b><span>Contributions are disabled until the owner sets and verifies the campaign wallet in the deployment environment.</span></div>}
          <div className="wallet-connect"><ConnectButton showBalance={false} /></div>
          <div className="field-label">Choose asset type</div>
          <div className="asset-switch">
            <button className={mode === "NATIVE" ? "asset-active" : ""} onClick={() => setMode("NATIVE")} type="button">Native coin</button>
            <button className={mode === "TOKEN" ? "asset-active" : ""} onClick={() => setMode("TOKEN")} type="button">ERC-20 token</button>
          </div>
          {mode === "TOKEN" && <div className="token-field"><label htmlFor="tokenAddress">Token contract address</label><input id="tokenAddress" value={tokenAddress} onChange={(event) => setTokenAddress(event.target.value)} placeholder="0x…" /><button className="text-button" onClick={detectToken} type="button">Verify token on configured network</button><small>Only use a token contract you have independently checked.</small></div>}
          <label className="field-label" htmlFor="amount">Contribution amount ({mode === "NATIVE" ? "native coin" : tokenSymbol})</label>
          <input className="amount-input" id="amount" inputMode="decimal" type="number" min="0" step="any" value={amount} onChange={(event) => setAmount(event.target.value)} />
          <div className="quick-amounts"><button type="button" onClick={() => setAmount("1")}>1</button><button type="button" onClick={() => setAmount("0.01")}>0.01</button><button type="button" onClick={() => setAmount("0.1")}>0.1</button><span>Asset units, not USD</span></div>
          <button className="button button-primary donate-button" disabled={!walletConfigured} onClick={donate} type="button">Contribute with wallet <span>↗</span></button>
          {walletConfigured && <div className="address-box"><span>Campaign wallet</span><a href={`${EXPLORER_URL}${DONATION_ADDRESS}`} target="_blank" rel="noreferrer">{DONATION_ADDRESS}</a><button onClick={copyAddress} type="button">Copy address</button></div>}
          <div className="balance-row"><span>Wallet balance on configured RPC</span><b>{nativeBalance} native</b></div>
          <div className="status-message" role="status">{status}</div>
        </div>
      </section>

      <section className="transparency-section" id="transparency">
        <div><div className="eyebrow">TRUST IS EARNED</div><h2>Clear goals.<br /><span>Honest updates.</span></h2></div>
        <div className="transparency-copy"><p>We will publish development milestones, campaign totals and a plain-language summary of how contributions are used. This site does not yet claim a verified supporter count or amount raised.</p><ul><li>Never publish a made-up progress number.</li><li>Keep public wallet addresses and transaction records verifiable.</li><li>Explain material changes to the campaign scope.</li></ul></div>
      </section>

      <footer className="footer">
        <a className="brand" href="#"><span className="brand-mark">₿</span><span>CRYPTO <b>DAAN</b></span></a>
        <p>Community support for open technology.</p>
        <small>Crypto contributions are voluntary and irreversible once confirmed on-chain. They are not investments, deposits or purchases of equity, tokens, rewards or guaranteed returns. Donors are responsible for checking the network, asset, destination and applicable local laws and taxes.</small>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Crypto Daan</span><a href="#contribute">Contribute ↑</a></div>
      </footer>
    </main>
  );
}
