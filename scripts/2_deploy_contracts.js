require('dotenv').config({ path: '../.env' })

const WSATT = artifacts.require('./WSATT.sol');

module.exports = async function (deployer, network, accounts) {
	return deployer.then(async () => {

		const { 
            SATT_ADDRESS
        } = process.env

        if (SATT_ADDRESS == null) {
            throw "SATT address is not defined"
        }
        
        console.log('SATT addresss: ', SATT_ADDRESS);

		// DEPLOY SWAP
        const token = await deployer.deploy(
            WSATT, 
            SATT_ADDRESS
        );

        console.log("");
        console.log('WSATT address: ', token.address);
	})
}