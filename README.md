# Crypto Daan

A no-KYC, direct crypto donation website starter built with Next.js, Ethereum wallet connection, RainbowKit, and ERC-20 token support.

## Features
- Connect wallet with RainbowKit (MetaMask, WalletConnect, etc.)
- Accept native ETH / polygon / other EVM-chain coin donations
- Accept custom ERC-20 token donations
- Donation wallet address display and copy action
- Balance display for donation wallet
- README with Vercel deployment steps

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file using `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
3. Update the values if needed:
   - `NEXT_PUBLIC_DONATION_ADDRESS` = your donation wallet address (default set to owner's address)
   - `NEXT_PUBLIC_RPC_URL` = your chain RPC URL (e.g. Polygon, Ethereum)
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = your WalletConnect project ID (optional)
4. Run locally:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Important notes
- This website is intentionally simple and donor-friendly: no backend, no donation form submission database, no donor KYC.
- Donors connect a wallet and send directly from it.
- If you later convert crypto to fiat or use an exchange, KYC may be required by that platform.
- For ERC-20 tokens, the donor wallet calls the token contract's `transfer()` function to your donation address.

## Privacy & Safety recommendations (read this)

This project aims to keep donor privacy high (no PII collected), while keeping your funds secure. Read these recommendations carefully and use them as a checklist before accepting public donations.

1. Use a separate donation wallet (recommended)
   - Do NOT use your personal main wallet. Create a dedicated wallet specifically for donations.
   - Better: use a multisig wallet (Gnosis Safe) so funds require multiple signatures to move. This reduces risk if one key is compromised.
   - Quick Gnosis Safe guide: https://gnosis-safe.io/

2. Multisig flow (recommended)
   - Create a Gnosis Safe on your chosen chain (Polygon recommended for lower gas).
   - Use the Safe address as `NEXT_PUBLIC_DONATION_ADDRESS`.
   - Keep signers' keys on hardware wallets and limit access.

3. Privacy considerations
   - On-chain transactions are public: anyone can see which addresses donated and amounts. This is blockchain-native and cannot be hidden.
   - This app stores no donor PII — it only displays the donation address and reads on-chain balances.
   - If you need donor anonymity, communicate to donors how to use privacy-preserving techniques (e.g., use mixers at their own risk, or donate from fresh wallets).

4. Adding tokens to donors' wallets
   - The UI includes a "Detect token" action and an optional "Add token to MetaMask" helper.
   - Donor wallets will always ask the donor to confirm transfers; the app cannot move funds without donor approval.

5. WalletConnect vs Injected wallets
   - "Injected" wallets are browser extensions like MetaMask. These work on desktop and MetaMask mobile when using built-in browser.
   - WalletConnect enables mobile wallets (Trust Wallet, Rainbow, MetaMask Mobile) to connect via QR/deep link.
   - If you do not provide a WalletConnect Project ID, the app still supports injected wallets (MetaMask) but mobile QR connections won't work.

6. Converting to fiat / exchanges
   - If you convert donations to fiat using exchanges, those services will likely require KYC for the exchange account.
   - Plan accounting and tax reporting accordingly.

## Vercel deployment

1. Push this repo to GitHub (already done).
2. Open Vercel and import the repository.
3. In project settings, set these environment variables:
   - `NEXT_PUBLIC_DONATION_ADDRESS`
   - `NEXT_PUBLIC_RPC_URL`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (optional)
   - `NEXT_PUBLIC_EXPLORER_URL`
4. Deploy.

## Example env file
```bash
NEXT_PUBLIC_DONATION_ADDRESS=0x1743FE06ad02B4422B9f214583A1C7e72aDE04b8
NEXT_PUBLIC_RPC_URL=https://polygon-rpc.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_EXPLORER_URL=https://polygonscan.com/address/
```

## Notes for production
- Use a secure custody wallet for funds.
- Prefer multisig (Gnosis Safe) for donation wallets handling public funds.
- Add on-chain monitoring and an off-chain receipts system if you need donor accounting.
- Consider adding rate-limiters or captchas on any backend endpoints (if you add a backend later) to avoid spam.
