const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node'); // Use tfjs-node for TensorFlow models

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Correct the path to the TensorFlow.js model file
const modelPath = `file://${path.join(__dirname, 'scripts', 'scripts', 'tfjs_model', 'model.json')}`;


let model;

// Function to load the TensorFlow.js model
async function loadModel() {
    try {
        // Use tf.loadGraphModel to load the model
        model = await tf.loadGraphModel(modelPath);
        console.log('Model loaded successfully');
    } catch (err) {
        console.error('Error loading model:', err);
    }
}

loadModel();

// Process uploaded image and return breed prediction
app.post('/predict', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;
        const imageBuffer = fs.readFileSync(imagePath);

        // Decode the image to a tensor
        const imageTensor = tf.node.decodeImage(imageBuffer, 3)
            .resizeBilinear([224, 224])  // Resize image to model input size
            .expandDims(0)               // Add batch dimension
            .div(tf.scalar(255));        // Normalize to [0, 1]

        // Run model inference
        const outputTensor = model.predict(imageTensor);
        const predictionArray = await outputTensor.array();

        // Identify the breed with the highest probability
        const breedIndex = predictionArray[0].indexOf(Math.max(...predictionArray[0]));

        // Clean up: delete the uploaded image after processing
        fs.unlinkSync(imagePath);

        // Send response with the breed index (you can map this to breed names if needed)
        res.json({ breedIndex });
    } catch (error) {
        console.error('Error during prediction:', error);
        res.status(500).send('Error processing the image');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
