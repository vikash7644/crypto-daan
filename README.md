# Crypto Daan

**Campaign idea: One billion people. One dollar each. A future we build together.**

Crypto Daan is a voluntary community-support campaign for the QORVYNT open-technology vision: QORVYNT Lang, QORVYNT Web4 and developer tools. The $1 figure is an invitation/illustrative ambition, not a required amount, funds raised, forecast or guaranteed outcome. Contributions do not provide equity, ownership, tokens, rewards or financial return.

## Supported payment choices in the UI

- BTC — Bitcoin network
- ETH — Ethereum mainnet
- BNB — BNB Smart Chain
- SOL — Solana
- USDT — selectable networks remain disabled until correct network-specific receiving addresses are supplied

Each asset/network has its own receiving-address setting. The campaign owner supplied these initial public addresses:

- BTC: `bc1p8xm6dpk7lcuq3ahrdzzkfwdrt5f6xhkmezdup4trj280djht53mq5k3rkd`
- ETH (Ethereum): `0xFb28ed92F3fDA5F5394091D909B9423A20736aB5`
- BNB (BNB Smart Chain): `0xFb28ed92F3fDA5F5394091D909B9423A20736aB5`
- SOL: `DydeUcxGuhPcWryskJBw3KfNceeK7LkCNmYPhLgzpg5v`
- USDT: no receiving address supplied yet; all USDT network options remain disabled.
- An additional Phantom wallet address was supplied separately; its intended asset/token and network must be confirmed before configuration.

These are owner-supplied, not independently ownership-verified. The BNB address is the address explicitly supplied for BNB Smart Chain. The ETH address is only for Ethereum. No USDT address has been supplied, so USDT options stay disabled. The additional Phantom address is not assigned to any asset/network until its intended use is confirmed. Test each network with a small transfer and inspect the transaction on the correct explorer before announcing that donations are live.

## Configure receiving addresses before launch

Set these environment variables in the hosting provider, using addresses controlled by the campaign owner and verified with test transfers:

- `NEXT_PUBLIC_BTC_ADDRESS`
- `NEXT_PUBLIC_ETH_ADDRESS`
- `NEXT_PUBLIC_BNB_ADDRESS`
- `NEXT_PUBLIC_SOL_ADDRESS`
- `NEXT_PUBLIC_USDT_ERC20_ADDRESS`
- `NEXT_PUBLIC_USDT_BEP20_ADDRESS`
- `NEXT_PUBLIC_USDT_SOL_ADDRESS` (not enabled)

After adding/changing variables, redeploy. Confirm the exact network and asset on a block explorer before publishing the campaign.

## Important implementation limitations

- This version provides asset/network selection and copy-address instructions only.
- It does not yet generate QR codes, monitor incoming transactions, calculate a live USD equivalent, or maintain a verified donor/raised-total counter.
- The optional transaction-reference form is front-end only and does not submit to a backend or verify payment.
- A transaction hash is not proof of successful receipt until independently checked on the correct chain.
- Do not announce that donations are enabled until all addresses, network instructions, legal requirements and test transfers are verified.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Legal, tax and safety

Crypto transfers are generally irreversible after confirmation. Donors must verify coin, network, receiving address, amount and network fee. Never ask donors for seed phrases or private keys. Do not describe contributions as tax-deductible unless that status has been independently established.

A public crypto donation campaign may trigger fundraising, tax, foreign-contribution, consumer-protection or virtual-digital-asset rules depending on the campaign operator and donor locations. Obtain qualified jurisdiction-specific advice before accepting public contributions, especially cross-border contributions. This software is not legal, tax, investment or custody advice.
