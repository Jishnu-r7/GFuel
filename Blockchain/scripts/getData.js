const { ethers } = require("ethers");
const config = require("./config");
const fs = require('fs');

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  
    const wallet = new ethers.Wallet(config.privateKey, provider);
    const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);

    const purchaseCount = await contract.getPurchaseCount();
    
	
    for (let i = 0; i < purchaseCount; i++) {
        const [price, date, customerID, index] = await contract.getPurchase(i);
        console.log("Purchase-", i, ": ", "Price:", price.toString(), "Date:", date, "CustomerID:", customerID, "Index: ", index);
    }
	
    
	const purchasesArray = await contract.getAllPurchases();
    console.log(purchasesArray[0]);
	
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
