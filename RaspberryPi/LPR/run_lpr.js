const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// Function to upload image file to Flask server
async function uploadImage(imagePath) {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));

        const response = await axios.post('https://brave-separately-sawfish.ngrok-free.app/upload', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        return { error: 'Error uploading image' };
    }
}

module.exports= uploadImage;
