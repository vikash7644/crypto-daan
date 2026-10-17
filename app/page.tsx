"use client";

import { useEffect, useMemo, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

const DONATION_ADDRESS = process.env.NEXT_PUBLIC_DONATION_ADDRESS || '0x0000000000000000000000000000000000000000';
const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://etherscan.io/address/';
const ERC20_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
];

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const [donationEthBalance, setDonationEthBalance] = useState<string>('—');
  const [donationTokenBalance, setDonationTokenBalance] = useState<string>('—');
  const [amount, setAmount] = useState('0.01');
  const [mode, setMode] = useState<'ETH' | 'TOKEN'>('ETH');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('TOKEN');
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [status, setStatus] = useState('Ready');

  const walletAddressText = useMemo(() => {
    if (address) return address;
    return 'Connect wallet to donate';
  }, [address]);

  useEffect(() => {
    fetchDonationBalances();
  }, [mode, tokenAddress, tokenDecimals]);

  async function fetchDonationBalances() {
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-rpc.com';
      const rpcProvider = new ethers.JsonRpcProvider(rpcUrl);
      const ethBalance = await rpcProvider.getBalance(DONATION_ADDRESS);
      setDonationEthBalance(ethers.formatEther(ethBalance));

      if (mode === 'TOKEN' && tokenAddress) {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, rpcProvider);
        const [symbol, decimals, rawBalance] = await Promise.all([
          tokenContract.symbol().catch(() => 'TOKEN'),
          tokenContract.decimals().catch(() => 18),
          tokenContract.balanceOf(DONATION_ADDRESS),
        ]);
        setTokenSymbol(symbol || 'TOKEN');
        setTokenDecimals(Number(decimals) || 18);
        setDonationTokenBalance(ethers.formatUnits(rawBalance, Number(decimals) || 18));
      } else {
        setDonationTokenBalance('—');
      }
    } catch (err) {
      console.error(err);
      setDonationEthBalance('—');
      setDonationTokenBalance('—');
    }
  }

  async function detectToken() {
    if (!tokenAddress) {
      setStatus('Please enter a token contract address.');
      return;
    }

    try {
      setStatus('Detecting token...');
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-rpc.com';
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const [symbol, decimals] = await Promise.all([
        contract.symbol().catch(() => 'TOKEN'),
        contract.decimals().catch(() => 18),
      ]);
      setTokenSymbol(symbol || 'TOKEN');
      setTokenDecimals(Number(decimals) || 18);
      setStatus(`Token detected: ${symbol || 'TOKEN'}`);
      await fetchDonationBalances();
    } catch (error) {
      console.error(error);
      setStatus('Could not detect token. Check the contract address and network.');
    }
  }

  async function addTokenToMetaMask() {
    if (!tokenAddress || !tokenSymbol) {
      setStatus('No token to add. Detect a token first.');
      return;
    }

    if ((window as any).ethereum && (window as any).ethereum.request) {
      try {
        const added = await (window as any).ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: '',
            },
          },
        });

        if (added) {
          setStatus(`${tokenSymbol} added to wallet.`);
        } else {
          setStatus('Token not added to wallet.');
        }
      } catch (err: any) {
        console.error(err);
        setStatus(err?.message || 'Could not add token to wallet.');
      }
    } else {
      setStatus('No injected wallet found (MetaMask).');
    }
  }

  async function handleDonate() {
    if (!isConnected || !address) {
      setStatus('Please connect your wallet first.');
      return;
    }

    if (!amount || Number(amount) <= 0 || Number.isNaN(Number(amount))) {
      setStatus('Enter a valid donation amount.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();

      if (mode === 'ETH') {
        setStatus('Preparing ETH donation...');
        const tx = await signer.sendTransaction({
          to: DONATION_ADDRESS,
          value: ethers.parseEther(amount),
        });
        setStatus('Transaction sent. Waiting for confirmation...');
        await tx.wait();
        setStatus('ETH donation successful! Thank you.');
      } else {
        if (!tokenAddress) {
          setStatus('Please enter a token contract address.');
          return;
        }

        setStatus('Preparing token donation...');
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const value = ethers.parseUnits(amount, tokenDecimals);
        const tx = await tokenContract.transfer(DONATION_ADDRESS, value);
        setStatus('Token transaction sent. Waiting for confirmation...');
        await tx.wait();
        setStatus(`Token donation successful (${tokenSymbol})! Thank you.`);
      }

      setAmount('0.01');
      await fetchDonationBalances();
    } catch (error: any) {
      console.error(error);
      setStatus(error?.message || 'Donation failed. Please try again.');
    }
  }

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    `ethereum:${DONATION_ADDRESS}`
  )}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Crypto Daan</p>
                <h1 className="mt-2 text-4xl font-bold">Direct crypto donations without KYC.</h1>
              </div>
              <div className="hidden sm:block">
                <ConnectButton showBalance={false} />
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Donation wallet</p>
              <a
                href={`${EXPLORER_URL}${DONATION_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all text-sm text-cyan-100 underline decoration-cyan-400/50 underline-offset-4"
              >
                {DONATION_ADDRESS}
              </a>

              <div className="mt-4 flex items-center gap-4">
                <div>
                  <img src={qrSrc} alt="Donation QR" className="h-40 w-40 rounded-lg bg-white p-2" />
                </div>
                <div className="text-sm text-slate-200">
                  <p className="mb-2">Share this QR or address for quick donations. It encodes the URI <code className="font-mono">ethereum:{DONATION_ADDRESS}</code>.</p>
                  <p className="text-xs text-slate-300">Note: QR opens wallets supporting deep-links (mobile). Ensure donors use the same chain as the donation address.</p>
                </div>
              </div>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">ETH balance</p>
                <p className="mt-1 text-2xl font-semibold">{donationEthBalance}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {mode === 'TOKEN' ? `${tokenSymbol} balance` : 'Token balance'}
                </p>
                <p className="mt-1 text-2xl font-semibold">{donationTokenBalance}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-slate-200">Choose donation type</p>
              <div className="inline-flex rounded-xl border border-white/10 bg-slate-900 p-1">
                <button
                  type="button"
                  onClick={() => setMode('ETH')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    mode === 'ETH' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ETH / native coin
                </button>
                <button
                  type="button"
                  onClick={() => setMode('TOKEN')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    mode === 'TOKEN' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ERC-20 token
                </button>
              </div>
            </div>

            {mode === 'TOKEN' && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <label className="mb-2 block text-sm font-medium text-slate-200">Token contract address</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={tokenAddress}
                    onChange={(event) => setTokenAddress(event.target.value)}
                    placeholder="0x..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={detectToken}
                    className="rounded-xl bg-violet-500 px-4 py-2 font-medium text-white transition hover:bg-violet-400"
                  >
                    Detect token
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">Detected token: {tokenSymbol} • decimals: {tokenDecimals}</p>

                <div className="mt-3 flex gap-2">
                  <button onClick={addTokenToMetaMask} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950">Add token to MetaMask</button>
                  <button onClick={() => { setTokenAddress(''); setTokenSymbol('TOKEN'); setTokenDecimals(18); setDonationTokenBalance('—') }} className="rounded-md bg-slate-800 px-3 py-2 text-sm">Clear</button>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Amount ({mode === 'ETH' ? 'ETH' : tokenSymbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-lg text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                placeholder="0.01"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDonate}
                className="flex-1 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Donate now
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(DONATION_ADDRESS)}
                className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 font-medium text-white transition hover:border-cyan-400 hover:text-cyan-200"
              >
                Copy address
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="font-medium text-slate-200">Status:</p>
              <p className="mt-1">{status}</p>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Wallet</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-4">
              <ConnectButton />
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Connected wallet</p>
                <p className="mt-2 break-all font-mono text-xs text-cyan-200">{walletAddressText}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Notes</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>No donor KYC required on this page.</li>
                  <li>Donors send directly from their wallet.</li>
                  <li>Token donations use the token’s transfer() method.</li>
                  <li>Fiat conversion later may trigger KYC.</li>
                </ul>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
