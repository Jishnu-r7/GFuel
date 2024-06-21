const { MongoClient } = require('mongodb');

// Connection URI for your MongoDB cluster
const uri = 'mongodb+srv://jishnur:mimi@cluster0.kkfxmlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB and return the EmployeeId for a given vehicle number
async function getEmployeeIdForVehicleNumber(vehicleNumberToSearch) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('gfuel');
        const collection = database.collection('vehiclenumber');

        // Query to find documents with the specified vehicle number
        const query = { VehicleNumber: vehicleNumberToSearch };
        const result = await collection.findOne(query);

        // If document found, return the EmployeeId, otherwise return "DoesNotExist"
        return result ? result.EmployeeId : 'DoesNotExist';
    } catch (error) {
        console.error('Error:', error);
        return 'DoesNotExist';
    } finally {
        await client.close();
    }
}

// Export the function to be called by an outside program
module.exports = getEmployeeIdForVehicleNumber;
