const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let shouldListen = false; // Flag to indicate whether to listen for POST requests

app.post('/updateCurrentPrice', (req, res) => {
    const currentPrice = req.body.currentPrice;
    console.log('Received current input price:', currentPrice);
    res.send('Received current input price: ₹' + currentPrice.toFixed(2));
});

const port = process.env.PORT || 3000;

// Function to start listening for POST requests
function startListening() {
    const server = app.listen(port, () => {
        console.log(`Receive server is running on port ${port}`);
    });
    return server;
}

// Function to stop listening for POST requests
function stopListening(server) {
    server.close(() => {
        console.log('Receive server stopped listening');
    });
}

module.exports = {
    startListening,
    stopListening,
    setListenFlag: (flag) => { shouldListen = flag; } // Function to set the shouldListen flag
};
