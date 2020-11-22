pragma solidity 0.5.16;

import "@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol";

contract StableXFactoryUpgrade is TransparentUpgradeableProxy {

    constructor(address logic, address admin, bytes memory data) TransparentUpgradeableProxy(logic, admin, data) public {

    }
}
