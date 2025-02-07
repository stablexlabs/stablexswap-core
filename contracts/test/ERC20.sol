pragma solidity =0.5.16;

import '../StableXERC20.sol';

contract ERC20 is StableXERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
