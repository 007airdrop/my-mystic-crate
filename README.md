# Mystic Crate

Base App on [Base](https://base.org). Press **S** to pay **0.000001 ETH** and mint a **real ERC-721 NFT** (tradeable on [OpenSea](https://opensea.io) and other Base marketplaces).

- **Treasury wallet:** `0xB2a3086539494F975C78D8D32c68a29e622eC6a5`
- **Live app:** [mystic-crate1.vercel.app](https://mystic-crate1.vercel.app)
- **Repo:** [github.com/007airdrop/mystic-crate1](https://github.com/007airdrop/mystic-crate1)

## Quick start

```bash
npm install
npm run metadata
npm run dev
```

## Deploy the NFT contract (one-time)

Minting requires an on-chain contract on Base mainnet.

1. Copy `.env.example` to `.env.local`.
2. Set `DEPLOYER_PRIVATE_KEY` to a wallet that has a small amount of Base ETH (for gas). This wallet deploys the contract; payments go to the treasury address above.
3. Run:

```bash
npm run compile:contract
npm run deploy:base
```

4. Add `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` from the deploy output to **Vercel** → Project → Settings → Environment Variables, then redeploy.

After deploy, each crate open calls `openCrate()` on the contract: the user receives an NFT in their wallet and the fee is sent to the treasury.

## Base App

1. Register the app at [base.dev](https://base.dev) with primary URL `https://mystic-crate1.vercel.app` (name, icon, tagline, screenshots, category, description, builder code). Asset URLs are listed in `public/base-app-metadata.json`.
2. Wallet connection uses the wagmi `baseAccount` connector inside the Base App; no Farcaster mini-app SDK is required.
3. If Vercel is connected to this repo, pushing to `main` redeploys — users get the new build after Vercel finishes.

## NFT metadata

Variant JSON for marketplaces is generated into `public/metadata/variants/` via `npm run metadata` (also runs before `npm run build`).
