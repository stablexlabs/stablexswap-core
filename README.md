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

2. Compile contracts:

    ```shell script
    truffle compile --all
    ```

3. Run deploy script:

    3.1 Testnet
    
    The deploy script will deploy `StableXFactory.sol`
    
        ```shell script
        truffle migrate -f 2 --network testnet
        ```
    
    3.2 Mainnet
    
    The deploy script will deploy contract `StableXFactory`
    
        ```shell script
        truffle migrate -f 2 --network mainnet
        ```
