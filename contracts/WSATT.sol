pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./ERC223/IERC223.sol";
import "./ERC223/IERC223Recipient.sol";

contract WSATT is ERC20Detailed, ERC20, Ownable, IERC223Recipient
{
    IERC223 public sattAdr;

    constructor (IERC223 _sattAdr)
        public
        ERC20Detailed("Wrapped Smart Advertising Transaction Token", "WSATT", 18)
    {
        sattAdr = _sattAdr;
    }

    function tokenFallback(address _from, uint _value, bytes32 _data) external
    {
        if (_msgSender() == address(sattAdr))
        {
            _mint(_from, _value);
        }
    }

    function contributeWSATT(uint256 value) public
    {
        _burn(_msgSender(), value);
        sattAdr.transfer(_msgSender(), value);
    }
}