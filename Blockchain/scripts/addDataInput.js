const { ethers } = require("hardhat");
const readline = require("readline");

async function main() {
    // Get the deployed contract instance
    const MyContract = await ethers.getContractFactory("PurchaseRecord");
    const myContract = await MyContract.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Prompt the user for price, date, and customerID
    rl.question("Enter price: ", async function (price) {
        rl.question("Enter date (YYYY-MM-DD): ", async function (date) {
            rl.question("Enter customer ID: ", async function (customerID) {
                // Call the function and pass parameters
                await myContract.addPurchase(price, date, customerID);

                console.log("Purchase added successfully!");

                // Close the readline interface
                rl.close();

                // Exit the process
                process.exit(0);
            });
        });
    });
}

main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
