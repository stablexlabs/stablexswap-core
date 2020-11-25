const StableXFactory = artifacts.require('StableXFactory');
const StableXFactoryProxy = artifacts.require('StableXFactoryProxy');

const fs = require('fs');
const Web3 = require('web3');

const web3 = new Web3();

module.exports = async (deployer, network, accounts) => {

  web3.setProvider(deployer.provider);

  const proxyAdmin = accounts[0];

  if (network === "mainnet") {
    const jsonFile = "build/contracts/StableXFactoryProxy.json";
    const abi = JSON.parse(fs.readFileSync(jsonFile))["abi"];

    await deployer.deploy(StableXFactory);

    let stableXFactoryProxy = new web3.eth.Contract(abi, '0x18be671d4221E9C7f2642A0182F3b3Fb7913Cd3b');
    // upgrade to new implementation
    await stableXFactoryProxy.methods.upgradeTo(StableXFactory.address).send({from: proxyAdmin});

  } else {
    const feeSettler = accounts[1];

    await deployer.deploy(StableXFactory);

    const abiEncodeData = web3.eth.abi.encodeFunctionCall({
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeToSetter",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },[feeSettler]);

    await deployer.deploy(StableXFactoryProxy, StableXFactory.address, proxyAdmin, abiEncodeData);

    const jsonFile = "build/contracts/StableXFactory.json";
    const abi = JSON.parse(fs.readFileSync(jsonFile))["abi"];

    let stableXFactoryProxy = new web3.eth.Contract(abi, StableXFactoryProxy.address);

    await stableXFactoryProxy.methods.setFeeTo(feeSettler).send({from: feeSettler, gas: 4700000});
  }
};
