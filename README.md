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
    
    The deploy script will deploy `StableXFactory.sol` and `StableXFactoryProxy.sol`
    
        ```shell script
        truffle migrate -f 2 --network testnet
        ```
    
    3.2 Mainnet
    
    The deploy script will deploy contract `StableXFactory` and call [StableXFactoryProxy.sol](https://bscscan.com/address/0x18be671d4221E9C7f2642A0182F3b3Fb7913Cd3b#code) to upgrade its implementation to the new deployed contract.
    
        ```shell script
        truffle migrate -f 2 --network mainnet
        ```
