const { ethers } = require("ethers");
const config = require("./config");

// Define the function to add a purchase to the blockchain
async function addPurchaseToBlockchain(userId, price, date) {
    // Connect to the ngrok URL
    const provider = new ethers.providers.JsonRpcProvider(config.providerURL);

    const wallet = new ethers.Wallet(config.privateKey, provider);
    const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);

    // Interact with the contract to add the purchase
    await contract.addPurchase(price, userId, date);
}

// Export the function for use by an outside program
module.exports = addPurchaseToBlockchain;
