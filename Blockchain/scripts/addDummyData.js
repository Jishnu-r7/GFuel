const { ethers } = require("ethers");
const config = require("./config");

// Function to generate a random date between two dates
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  // Retrieve contract artifacts and signer
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  
  const wallet = new ethers.Wallet(config.privateKey, provider);
  const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);
  
  // Object to track entries added for each employee this month
  const entriesThisMonth = {};

  // Loop through each employee and add purchase data
  const employees = [
    {
      EmployeeId: "EMP001",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP002",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP003",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP004",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP005",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP006",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP007",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP008",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP009",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP010",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP011",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP012",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP013",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP014",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP015",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP016",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP017",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP018",
      // Add other employee details here...
    },{
      EmployeeId: "EMP019",
      // Add other employee details here...
    },
    {
      EmployeeId: "EMP020",
      // Add other employee details here...
    },
    // Add other employees here...
  ];

  for (const employee of employees) {
    entriesThisMonth[employee.EmployeeId] = 0; // Initialize entries for this month for each employee
    // Generate at least 10 entries
    for (let i = 0; i < 10; i++) {
      // Generate random cost between 100 and 2000
      const cost = Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
      
      // Generate random date after 2024 and before today
      const startDate = new Date("2024-01-01"); // Start date after 2024
      const endDate = new Date(); // Today's date
      const randomPurchaseDate = randomDate(startDate, endDate);
      
      // Check if the generated date is for this month
      const currentDate = new Date();
      const isThisMonth = randomPurchaseDate.getMonth() === currentDate.getMonth();

      // If it's not for this month and we haven't added 5 entries for this month yet, adjust the date
      if (!isThisMonth && entriesThisMonth[employee.EmployeeId] < 5) {
        randomPurchaseDate.setMonth(currentDate.getMonth());
        entriesThisMonth[employee.EmployeeId]++; // Increment entries for this month
      }

      // Format date as string
      const formattedDate = randomPurchaseDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Add purchase data
      await contract.addPurchase(cost, formattedDate, employee.EmployeeId);
      console.log(`Purchase data added for employee ${employee.EmployeeId} successfully.`);
    }
  }
  await contract.addPurchase(2000, "2024-05-05", "EMP003");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
