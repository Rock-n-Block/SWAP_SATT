pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./ERC223/IERC223.sol";
import "./ERC223/IERC223Recipient.sol";

contract WSATT is ERC20Detailed, ERC20, Ownable, IERC223Recipient
{
    IERC223 public sattAddr;

    event TokenSwapped(address indexed user, uint256  amount);
    event TokenReturned(address indexed user, uint256 amount);

    constructor (IERC223 _sattAddr)
        public
        ERC20Detailed("Wrapped Smart Advertising Transaction Token", "WSATT", 18)
    {
        sattAddr = _sattAddr;
    }

    function tokenFallback(address _from, uint _value, bytes32 _data) external
    {
        if (_msgSender() == address(sattAddr))
        {
            _mint(_from, _value);

            emit TokenSwapped(_from, _value);
        }
    }

    function contributeWSATT(uint256 value) public
    {
        _burn(_msgSender(), value);
        sattAddr.transfer(_msgSender(), value);

        emit TokenReturned(_msgSender(), value);
    }

    function transfer(address recipient, uint256 amount) public  returns (bool) {
        require(recipient != address(sattAddr), "WSATT: Cannot transfer to SATT address");
        super.transfer(recipient, amount);
    }
}