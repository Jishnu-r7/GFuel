const { ethers } = require("ethers");
const config = require("./config");

async function main() {
	
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  
  const wallet = new ethers.Wallet(config.privateKey, provider);
  const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);
  // Add purchase data
  await contract.addPurchase(100, "2024-04-04", "ABC123");
  console.log("Purchase data added successfully.");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
