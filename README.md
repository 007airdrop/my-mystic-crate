# Mystic Crate

Farcaster mini app on [Base](https://base.org). Press **S** to pay **0.000001 ETH** and mint a **real ERC-721 NFT** (tradeable on [OpenSea](https://opensea.io) and other Base marketplaces).

- **Treasury wallet:** `0x1630C69E6dDA942AAE2E9182A69eF4dEC6ce0A9D`
- **Live app:** [my-mystic-crate.vercel.app](https://my-mystic-crate.vercel.app)
- **Repo:** [github.com/007airdrop/my-mystic-crate](https://github.com/007airdrop/my-mystic-crate)

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

## Farcaster sync

If Vercel is connected to this GitHub repo, pushing to `main` triggers a new deployment. The Farcaster mini app loads `https://my-mystic-crate.vercel.app` from `public/.well-known/farcaster.json` — no separate Farcaster publish step; users get the new build after Vercel finishes.

## NFT metadata

Variant JSON for marketplaces is generated into `public/metadata/variants/` via `npm run metadata` (also runs before `npm run build`).
