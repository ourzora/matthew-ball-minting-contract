# Matthew Ball Essay Minting Contract

Features:
1. On-chain metadata with stored content uri and content hash accessible on the contract level
2. Royalties through new EIP2981 standard - payout addresses can be changed per mint, but the BPS cannot be changed.

How to customize and use for yourself:
1. update contract name information in `deploy/01_onchainessay.ts`
3. run `yarn run test`
4. setup `.env`, see hardhat networks config for format
5. run `yarn run deploy --network rinkeby` to deploy to rinkeby
6. run `yarn run deploy --network mainnet` to deploy to mainnet
