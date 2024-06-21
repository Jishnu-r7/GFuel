const { exec } = require('child_process');
const fs = require('fs');

// Function to capture image and save it
async function captureAndSaveImage() {
    return new Promise((resolve, reject) => {
        // Execute raspistill command to capture image with increased quality
        const command = '/usr/bin/raspistill -o image.jpg -w 1920 -h 1080 -q 100'; // Adjust quality (0 to 100)
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error capturing image: ${stderr}`);
                reject(error);
            } else {
        console.log('Image captured successfully.');
        // Read the captured image file
        const imageData = fs.readFileSync('image.jpg');
        console.log('Image processed.');
        resolve(imageData);
              }
    });
  });
}

// Export the function to be used from outside
module.exports = captureAndSaveImage;
