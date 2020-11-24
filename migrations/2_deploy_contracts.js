const StableXFactory = artifacts.require('StableXFactory');
const StableXFactoryProxy = artifacts.require('StableXFactoryProxy');

const fs = require('fs');
const Web3 = require('web3');

const web3 = new Web3();

module.exports = async (deployer, network, accounts) => {

  web3.setProvider(deployer.provider);

  const feeSettler = accounts[0];
  const feeReceiver = accounts[1];
  const proxyAdmin = accounts[2];

  await deployer.deploy(StableXFactory);
  const factory = await StableXFactory.deployed();
  console.log(await factory.INIT_CODE_PAIR_HASH())

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

  const setFeeTx = await stableXFactoryProxy.methods.setFeeTo(feeReceiver).send({from: feeSettler, gas: 4700000});
  console.log(setFeeTx);
};
