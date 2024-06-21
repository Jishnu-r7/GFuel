const fetch = require('cross-fetch');
const bodyParser = require('body-parser');
const captureAndSaveImage = require('./Camera/run_camera');
const uploadImage = require('./LPR/run_lpr');
const getEmployeeIdForVehicleNumber = require('./Mongo/run_mongo');
const addPurchaseToBlockchain = require('./Blockchain/addDataFromOutside');
const express = require('express');
const { sendAlertEmail } = require('./Alert/run_alert');

const PUMP_LOCATION = "Varikoli";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
	while(1){
	/*
		//capturing image
		console.log("Capturing Image");
	
		try {
			const imageData = await captureAndSaveImage();
		} catch (error) {
			console.error('Error:', error);
		}
	*/
		console.log("Running license plate recognition");
	
		//extracting license plate number
	
		let result=null;
		try {
			const imagePath = "image1.jpg"
			result = await uploadImage(imagePath);
		} catch (error) {
			console.error('Error:',error);
		}
		console.log("Detected license plate number: " + result.detectedNumber);
		
		if(result.detectedNumber == licensePlateNumber) {
			console.log("Same vehicle. ssetting timeout for 5 seconds");
			await sleep(5000);
			continue;
		}
		licensePlateNumber = result.detectedNumber;
		
		if(licensePlateNumber == "NO PLATE") {
			continue;
		}
		
		//missing vehicle
		try {
			const missing = await sendAlertEmail(licensePlateNumber, PUMP_LOCATION);
			if (missing){
				await sleep(5000);
				continue;
			}
		} catch (error) {
			console.error("Error: ", error);
		}
		
		console.log("Searching for vehicle in database");
		
		//getting employee id from database using detected number plate
		result=null;
		try{
			result=await getEmployeeIdForVehicleNumber(licensePlateNumber);
		} catch (error) {
			console.error('Error:',error);
		}

		//adding data to blockchcain if given license plate exist in database
		if (result != "DoesNotExist") {
            console.log("Vehicle belongs to employee " + result);

            // Get the current date
            const currentDate = new Date();
            // Convert the date to a string in YYYY-MM-DD format
            const formattedDate = currentDate.toISOString().split('T')[0];

            try {
                let price = null;

                // Start listening for price input
				const app = express();
				app.use(bodyParser.json());
				
                // Promise to wait for price input
                const pricePromise = new Promise((resolve) => {
                    app.post('/updateCurrentPrice', (req, res) => {
                        price = req.body.currentPrice;
                        res.send('Data received successfully');
                        resolve(price);
                        
                        server.close(() => {
						});
                        
                    });
                });

                const port = 3001;
                const server = app.listen(port, () => {
                    console.log(`Listening for price input`);
                });

                // Wait for price input
                price = await pricePromise;

                console.log("Price input =", price);
                addPurchaseToBlockchain(formattedDate, price, result);
                console.log("Added data to blockchain");
				
				console.log("Timing out for 10 seconds to finish fuelling");
				await sleep(10000);
            } catch (error) {
                console.error('Error:', error);
            }
        }
		
		else {
			console.log("Vehicle does not belong to a registered employee");
		}
	}
}

let licensePlateNumber = null;
main();



