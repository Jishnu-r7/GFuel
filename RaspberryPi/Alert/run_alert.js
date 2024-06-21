const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://sebin:booty@cluster0.kkfxmlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sebinkuriakose276@gmail.com',
        pass: 'ntuoluykipxynguo'
    }
});

// Function to send email
async function sendAlertEmail(licensePlate, location) {
    try {
        await client.connect();
        const database = client.db('gfuel');
        const collection = database.collection('criminalVehicles');

        // Search for the license plate number in the database
        const result = await collection.findOne({ vehiclenumber: licensePlate });

        // If license plate number is found, send alert email
        if (result) {
            const mailOptions = {
                from: 'sebinkuriakose276@gmail.com',
                to: [`${result.stationmail}`, 'vishnuprakashgdsc@gmail.com'],
                subject: 'Alert: License Plate Matched',
                text: `License plate number ${licensePlate} was found in ${location}.\nOwner Name: ${result.ownername}\nModel Name: ${result.carmodel}`
            };
            await transporter.sendMail(mailOptions);
            console.log('Missing vehicle found\nAlert email sent successfully.\n');
            return 1;
        } else {
            console.log('License plate number not found in the database.');
            return 0;
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

// Export the sendAlertEmail function
module.exports = {
    sendAlertEmail
};
