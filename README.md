# Crypto Daan

**Website:** https://vikash7644.github.io/crypto-daan/

Crypto Daan is an individual-led, voluntary community-support page for open technology, including **QORVYNT Lang**, its compiler and virtual machine, developer tools and related public work.

## Community contributions

The public page displays owner-supplied receiving addresses for BTC, ETH (Ethereum), ETH (Linea), BNB (BNB Smart Chain), SOL, TRX and XLM. The project owner has confirmed these addresses are from their receiving wallets. They have not been independently audited or proven by an on-chain signature.

Support is voluntary. There is no minimum contribution, no organization or investor relationship required, and no equity, ownership, token, repayment, reward or financial return is offered. Supporters do not need to contact the project owner or join a group.

**Send only the exact native asset on the selected network.** The same EVM address is used for Ethereum, Linea and BNB Smart Chain, but these are different networks. Stablecoin routes (including USDT/USDC) are not offered.

See [DONATE.md](./DONATE.md) for addresses, explorer links, safety notes and intended use of funds.

## What support is intended to fund

- QORVYNT compiler, VM and language tooling
- Testing, security review and responsible fixes
- Build and release infrastructure
- Documentation, tutorials and public progress reports

These are intended categories, not a published budget or a claim that funds have been received.

## Development

The GitHub Pages website is the static `index.html` at the repository root. The separate Next.js application lives in `app/`.

```bash
npm install
npm run dev
npm run build
```

## Legal and safety

This campaign is not represented as a registered charity or tax-exempt organization. No tax deduction is promised. Contributions do not provide equity, ownership, tokens, repayment, rewards or financial returns. Tax and legal treatment depends on the facts and applicable law, including rules that may apply to digital assets and cross-border receipts.

Crypto transfers are generally irreversible. Verify the full address and network before sending. Never share a seed phrase, recovery phrase, private key, password or OTP. Do not pay anyone an activation fee. Public explorer pages show on-chain activity but do not independently prove wallet ownership or automatically verify that a contribution was intended for this campaign.

## GitHub Pages deployment

The static site is published from the repository root by `.github/workflows/deploy-pages.yml`. Pushes to `main` run the workflow. See [GitHub Actions](https://github.com/vikash7644/crypto-daan/actions) for deployment status.
