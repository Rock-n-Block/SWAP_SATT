pragma solidity ^0.5.0;

import "./ERC223/IERC223.sol";
import "./ERC223/IERC223Recipient.sol";
import "./WSATT.sol";

contract Swap_ERC223_ERC20 is IERC223Recipient
{
    IERC223 SATT_addr;
    WSATT WSATT_addr;

    constructor(IERC223 _SATT_addr, WSATT _WSATT_addr) public
    {
        SATT_addr = _SATT_addr;
        WSATT_addr = _WSATT_addr;
    }

    function tokenFallback(address _from, uint _value, bytes memory _data) public
    {
        if (msg.sender == address(SATT_addr))
        {
            WSATT_addr.mint_swap(_from, _value);
        }
    }

    function contributeWSATT(uint256 value) public
    {
        WSATT_addr.transferFrom(msg.sender, address(this), value);
        WSATT_addr.burn_swap(address(this), value);
    }
}