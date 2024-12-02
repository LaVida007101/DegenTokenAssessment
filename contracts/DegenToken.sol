// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20{
    address private _owner;

    constructor() ERC20("Degen", "DGN") {
        _owner = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == _owner, "Only owner can mint");
        require(to != address(0), "Invalid address");
        _mint(to, amount);
    }

    function transferTokens(address to, uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        approve(msg.sender, amount);
        transfer(to, amount);
    }

    function redeemTokens(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
    }

    function checkBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }

    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
    }
}
