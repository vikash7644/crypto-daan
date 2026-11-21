# Crypto Daan

**Campaign idea: One billion people. One dollar each. A future we build together.**

Crypto Daan is a community-support website for the QORVYNT open-technology vision: QORVYNT Lang, QORVYNT Web4, and developer tools. The $1 figure is an illustrative invitation, not a required amount. Contributions are voluntary and do not provide equity, ownership, tokens, rewards, or a financial return.

## Current implementation

- Next.js 14 app with responsive campaign landing page.
- RainbowKit / wagmi wallet connection for supported EVM wallets.
- Native-coin and manually specified ERC-20 contribution flow.
- Token contract lookup against the configured RPC.
- Campaign wallet display and copy action.
- Campaign-wallet configuration guard: transfers are disabled until a valid non-zero wallet address is configured.
- No fabricated supporter counter or raised-amount progress display.

## Configure before accepting contributions

1. Set `NEXT_PUBLIC_DONATION_ADDRESS` in the hosting provider to a wallet you control and have independently verified.
2. Set `NEXT_PUBLIC_RPC_URL` to an RPC endpoint for the network you intend to use.
3. Set `NEXT_PUBLIC_EXPLORER_URL` to that network's address explorer prefix.
4. Set a real `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` for WalletConnect support.
5. Confirm the configured network, destination address, token contract and test transaction before announcing the site.

**Important:** The app currently supports the native coin and ERC-20 tokens on the configured EVM network. It does not convert $1 USD into a crypto amount automatically. Donors must review the asset, network, amount, destination and gas fee in their wallet before approving.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy

Import this repository into Vercel and configure the environment variables above. Redeploy after changing environment variables.

## Transparency and legal notes

The $1 billion figure is a long-term campaign ambition, not funds raised, a forecast, or a guarantee. Publish verified on-chain totals and clear spending reports before making progress claims. Crypto transactions are generally irreversible after confirmation. Donors should check applicable laws and tax rules. Do not describe contributions as tax-deductible unless that status has been independently established.

This project is a software starter, not legal, tax, investment, or custody advice. A public donation campaign may trigger local fundraising, tax, foreign-contribution, consumer-protection or virtual-digital-asset rules. Obtain jurisdiction-specific advice before accepting public contributions, especially cross-border contributions.
