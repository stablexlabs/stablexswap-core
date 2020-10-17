const StableXFactory = artifacts.require("StableXFactory");
const feeToSetter = '0x94AA0EfFb7cb7C612Ddf665EaF26FDBB9B540cd2';
const WBNB = {
    mainnet:'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    testnet:'0xae13d989dac2f0debff460ac112a837c89baa7cd'
};

module.exports = async (deployer) => {
    await deployer.deploy(StableXFactory, feeToSetter)
};