pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/upgradeability/AdminUpgradeabilityProxy.sol";

contract StableXFactoryProxy is AdminUpgradeabilityProxy {

    constructor(address logic, address admin, bytes memory data) AdminUpgradeabilityProxy(logic, admin, data) public {

    }
}