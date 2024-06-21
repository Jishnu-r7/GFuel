const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.post('/updateCurrentPrice', (req, res) => {
    const currentPrice = req.body.currentPrice;
    console.log('Received current input price:', currentPrice);

    fetch('http://causal-exact-porpoise.ngrok-free.app/updateCurrentPrice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentPrice: currentPrice
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('POST request to receive server successful');
            res.send('Data sent to receive server');
        } else {
            console.error('Error sending data to receive server:', response.statusText);
            res.status(500).send('Error sending data to receive server');
        }
    })
    .catch(error => {
        console.error('Error sending data to receive server:', error);
        res.status(500).send('Error sending data to receive server');
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Send server is running on port ${port}`);
});
