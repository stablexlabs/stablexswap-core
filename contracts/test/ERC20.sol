pragma solidity =0.6.12;

import '../StableXERC20.sol';

contract ERC20 is StableXERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
