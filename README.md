# StableX core

Forked from [Uniswap](https://github.com/Uniswap/uniswap-v2-core)

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`


## Deploy

1. Fill your mnemonic to `.env`, example: 

```
MNEMONIC=brain surround have swap horror body response double fire dumb bring hazard
```

2. Run deploy script:

Deploy to BSC testnet
```shell script
truffle migrate -f 2 --network testnet
```

Deploy to BSC mainnet
```shell script
truffle migrate -f 2 --network mainnet
```
