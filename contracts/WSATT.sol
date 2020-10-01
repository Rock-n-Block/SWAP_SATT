pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Swap_ERC223_ERC20.sol";

contract WSATT is ERC20Detailed, ERC20, Ownable
{
    Swap_ERC223_ERC20 public SwapContract;

    constructor () public ERC20Detailed("Wsatt", "WSATT", 18) {}

    modifier onlySwapContract() {
        require(msg.sender == address(SwapContract),
                "WSATT: caller is not the swap contract");
        _;
    }

    function setSwapContract(Swap_ERC223_ERC20 newSwap) public onlyOwner
    {
        SwapContract = newSwap;
    }

    function mint_swap(address account, uint256 amount) public onlySwapContract
    {
        _mint(account, amount);
    }

    function burn_swap(address account, uint256 amount) public onlySwapContract
    {
        _burn(account, amount);
    }

    function mint(address account, uint256 amount) public onlyOwner
    {
        _mint(account, amount);
    }
}