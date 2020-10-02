# Wrapped Smart Advertising Transaction Token



### Install prerequisites

```bash
yarn install
```

---

### Test

```bash
yarn test
```

---

### Deployment

When deploying contracts, `.env` file must be supplied. 
Environment file must contain:

- DEPLOYER_MNEMONIC
- Infura project endpoint, e.g. INFURA_MAINNET, INFURA_ROPSTEN, INFURA_KOVAN
- SATT contract address

Example file can be found in `.env.example`

```bash
yarn deploy-<network_name> (ropsten|kovan|mainnet)
```

For example:

```bash
yarn deploy-ropsten
```

---

#### Verifying

`.env` file must contain ETHERSCAN_API_KEY

```bash
yarn verify-<network_name> (ropsten|kovan|mainnet)
```

This will verify deployed contract on Etherscan