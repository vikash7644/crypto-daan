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
3. Update the values:
   - `NEXT_PUBLIC_DONATION_ADDRESS` = your donation wallet address
   - `NEXT_PUBLIC_RPC_URL` = your chain RPC URL (e.g. Polygon, Ethereum)
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = your WalletConnect project ID
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

## RainbowKit setup
- RainbowKit requires a WalletConnect project ID.
- Create one here: https://cloud.walletconnect.com/
- Then set it in `.env.local`:
  ```bash
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
  ```

## Vercel deployment

1. Push this repo to GitHub.
2. Open Vercel and import the repository.
3. In project settings, set these environment variables:
   - `NEXT_PUBLIC_DONATION_ADDRESS`
   - `NEXT_PUBLIC_RPC_URL`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_EXPLORER_URL`
4. Deploy.

## Example env file
```bash
NEXT_PUBLIC_DONATION_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_RPC_URL=https://polygon-rpc.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_EXPLORER_URL=https://polygonscan.com/address/
```

## Notes for production
- Use a secure custody wallet for funding and donation operations.
- Consider a multi-sig wallet for better security.
- For donations from unknown users, add transaction verification and a receipt layer if needed.
