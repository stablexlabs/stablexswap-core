import { Contract, Wallet } from 'ethers'
import { Web3Provider } from 'ethers/providers'
import { deployContract } from 'ethereum-waffle'

import { expandTo18Decimals } from './utilities'

import ERC20 from '../../build/ERC20.json'
import StableXFactory from '../../build/StableXFactory.json'
import StableXFactoryProxy from '../../build/StableXFactoryProxy.json'
import StableXPair from '../../build/StableXPair.json'

interface FactoryFixture {
  factory: Contract
}

const overrides = {
  gasLimit: 9999999
}

export async function factoryFixture(web3: Web3Provider, [wallet]: Wallet[]): Promise<FactoryFixture> {
  const signers = await web3.listAccounts();
  const signersLength = signers.length;
  const proxyAdmin = await signers[signersLength-1];

  const factoryInstance = await deployContract(wallet, StableXFactory, [], overrides);
  const factoryProxy = await deployContract(wallet, StableXFactoryProxy, [factoryInstance.address, proxyAdmin, []], overrides);
  const factory = factoryInstance.attach(factoryProxy.address);
  await factory.initialize(wallet.address);

  return { factory }
}

interface PairFixture extends FactoryFixture {
  token0: Contract
  token1: Contract
  pair: Contract
}

export async function pairFixture(provider: Web3Provider, [wallet]: Wallet[]): Promise<PairFixture> {
  const { factory } = await factoryFixture(provider, [wallet])

  const tokenA = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)], overrides)
  const tokenB = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)], overrides)

  await factory.createPair(tokenA.address, tokenB.address, overrides)
  const pairAddress = await factory.getPair(tokenA.address, tokenB.address)
  const pair = new Contract(pairAddress, JSON.stringify(StableXPair.abi), provider).connect(wallet)

  const token0Address = (await pair.token0())
  const token0 = tokenA.address === token0Address ? tokenA : tokenB
  const token1 = tokenA.address === token0Address ? tokenB : tokenA

  return { factory, token0, token1, pair }
}
