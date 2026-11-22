# Crypto Daan

**Website:** https://vikash7644.github.io/crypto-daan/

**One billion people. One dollar each. A future we build together.**

Crypto Daan is a voluntary community-support campaign concept for open technology projects, including QORVYNT Lang, QORVYNT Web4 and developer tools. The one-billion/one-dollar line is an aspirational campaign idea—not a fundraising result, forecast, or promise.

## Current status: pre-launch

**Do not send cryptocurrency. Contributions are not being accepted.** The project owner supplied updated receiving addresses for BTC, ETH, Linea ETH, BNB, SOL, TRX and XLM. Basic address-format checks do not prove ownership or signing control. Network-specific test transfers and applicable legal/tax/compliance reviews are still required.

Stablecoin routes (including USDT/USDC) are intentionally not enabled until each exact token contract and network is confirmed. The same EVM address is listed for Ethereum, Linea and BNB Smart Chain; send only the native asset on the exact network.

See [DONATE.md](./DONATE.md) for the owner-supplied addresses, network warnings and campaign status. Do not transfer funds until an explicit launch announcement.

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
