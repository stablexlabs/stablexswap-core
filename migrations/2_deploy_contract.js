const StableXFactory = artifacts.require('StableXFactory')
const feeToSetter = '0x94AA0EfFb7cb7C612Ddf665EaF26FDBB9B540cd2'

module.exports = async deployer => {
  await deployer.deploy(StableXFactory, feeToSetter)
  const factory = await StableXFactory.deployed()
  console.log(await factory.INIT_CODE_PAIR_HASH())
}
