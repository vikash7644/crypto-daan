# Crypto Daan

**Website:** https://vikash7644.github.io/crypto-daan/

**One billion people. One dollar each. A future we build together.**

Crypto Daan is a voluntary community-support campaign concept for open technology projects, including QORVYNT Lang, QORVYNT Web4 and developer tools. The one-billion/one-dollar line is an aspirational campaign idea—not a fundraising result, forecast, or promise.

## Current status: pre-launch

**Do not send cryptocurrency. Contributions are not being accepted.** The website displays owner-supplied receiving addresses for transparency only. Wallet ownership, exact token contracts, network-specific test transfers and applicable legal/tax/compliance requirements have not all been independently verified or completed.

The payment selector on the static website lists these routes:

- BTC — Bitcoin
- ETH — Ethereum
- BNB — BNB Smart Chain
- SOL — Solana
- USDT — Ethereum (ERC-20) and BNB Smart Chain (BEP-20)
- USDT / USDT0 — Arbitrum One, Monad and Polygon
- USDT — Tron (TRC-20)

The addresses and network-specific warnings are documented in [DONATE.md](./DONATE.md). An address being displayed does not mean that the token contract or network has been verified. Do not transfer funds until the campaign completes its checks and explicitly announces that contributions are open.

## What the campaign intends to support

- Software engineering and compiler/tooling development
- Testing, security review and responsible fixes
- Build and release infrastructure
- Documentation, tutorials and public progress reports

These are intended categories, not a published budget or a claim that funds have been received.

## Partnerships and sponsorship

For infrastructure, engineering, security, community or ecosystem partnership discussions, open an issue in this repository:

https://github.com/vikash7644/crypto-daan/issues/new

See [docs/FUNDING_AND_SPONSORS.md](./docs/FUNDING_AND_SPONSORS.md) for a researched grant shortlist and application-readiness checklist. No grant application is represented as submitted or approved.

## Development

The GitHub Pages website is the static `index.html` at the repository root. The separate Next.js application lives in `app/`.

```bash
npm install
npm run dev
npm run build
```

## Legal and safety

Crypto transfers are generally irreversible. Never share a seed phrase, recovery phrase or private key. This campaign is not represented as a registered charity or tax-exempt organization. Contributions do not provide equity, ownership, tokens, repayment, rewards or financial returns. Do not claim tax deductibility.

Public and cross-border fundraising can trigger legal, tax, foreign-contribution, consumer-protection and virtual-digital-asset rules. Obtain qualified jurisdiction-specific advice before soliciting or accepting contributions. This repository is not legal, tax, investment or custody advice.

## GitHub Pages deployment

The static site is published from the repository root by `.github/workflows/deploy-pages.yml`. Pushes to `main` run the workflow, which verifies `index.html`, uploads the site artifact and deploys it to GitHub Pages. See [GitHub Actions](https://github.com/vikash7644/crypto-daan/actions) for the latest run and deployment result.
