const BN = require("bn.js");
const chai = require("chai");
const { expect } = require("chai");
const helper = require("./utils/utils.js");
const expectRevert = require("./utils/expectRevert.js");
chai.use(require("chai-bn")(BN));


const SATT = artifacts.require('ERC223Token');
const WSATT = artifacts.require('WSATT');

const TOKEN_AMOUNT = new BN((10 ** 18).toString());
const ETH_ZERO_ADDERSS = '0x0000000000000000000000000000000000000000'

contract(
    'TokenSwap',
    ([
        deployer,
        manager,
        account1,
        account2
    ]) => {
        let sattToken;
        let wsattToken;

        
        beforeEach(async () => {
            // Init contracts

            sattToken = await SATT.new({from: deployer});

            wsattToken = await WSATT.new(
                sattToken.address,
                {from: deployer}
            )
            
        })

        it("#0 deploy validation", async () => {
            expect(await wsattToken.name()).to.be.equals("Wrapped Smart Advertising Transaction Token");
            expect(await wsattToken.symbol()).to.be.equals("WSATT");
            expect(await wsattToken.decimals()).to.be.bignumber.equals(new BN("18"));
            expect(await wsattToken.owner()).to.be.equals(deployer);
            expect(await wsattToken.sattAddr()).to.be.equals(sattToken.address);
        })

        it("#1 should swap", async () => {
            expect(await sattToken.balanceOf(account1)).to.be.bignumber.zero;
            expect(await wsattToken.balanceOf(account1)).to.be.bignumber.zero;

            await sattToken.mint(account1, TOKEN_AMOUNT, {from: deployer})
            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            
            await sattToken.transfer(wsattToken.address, TOKEN_AMOUNT, ETH_ZERO_ADDERSS, {from: account1})
            expect(
                await wsattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.zero;
        })

        it("#2 should withdraw", async () => {
            expect(await sattToken.balanceOf(account1)).to.be.bignumber.zero;
            expect(await wsattToken.balanceOf(account1)).to.be.bignumber.zero;

            await sattToken.mint(account1, TOKEN_AMOUNT, {from: deployer})
            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            
            await sattToken.transfer(wsattToken.address, TOKEN_AMOUNT, ETH_ZERO_ADDERSS, {from: account1})
            expect(
                await wsattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.zero;

            await wsattToken.contributeWSATT(TOKEN_AMOUNT, {from: account1})

            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            expect(
                await wsattToken.balanceOf(account1)
            ).to.be.bignumber.zero;
        })

        it("#3 should not withdraw more than swapped before", async () => {
            expect(await sattToken.balanceOf(account1)).to.be.bignumber.zero;
            expect(await wsattToken.balanceOf(account1)).to.be.bignumber.zero;

            await sattToken.mint(account1, TOKEN_AMOUNT, {from: deployer})
            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            
            await sattToken.transfer(wsattToken.address, TOKEN_AMOUNT, ETH_ZERO_ADDERSS, {from: account1})
            expect(
                await wsattToken.balanceOf(account1)
            ).to.be.bignumber.that.equals(TOKEN_AMOUNT);
            expect(
                await sattToken.balanceOf(account1)
            ).to.be.bignumber.zero;

            await expectRevert(
                wsattToken.contributeWSATT(TOKEN_AMOUNT.mul(new BN("2")), {from: account1}),
                "ERC20: burn amount exceeds balance"
            )
        })
    }
)