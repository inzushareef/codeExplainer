const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static('./'));

// Proxy endpoint for the API
app.post('/api/explain', async (req, res) => {
    try {
        console.log('Received request:', req.body); // Debug log

        const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 3ea91eb08fa347d3bcaae9b933f215a9',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: "mistralai/Mistral-7B-Instruct-v0.2",
                messages: req.body.messages,
                temperature: req.body.temperature,
                max_tokens: req.body.max_tokens
            })
        });

        console.log('API Response Status:', response.status); // Debug log

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText); // Debug log
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API Success Response:', data); // Debug log
        res.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ 
            error: error.message,
            details: 'An error occurred while processing your request'
        });
    }
});

// Add a test endpoint to verify the server is running
app.get('/api/test', (req, res) => {
    res.json({ status: 'Server is running' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Test endpoint available at http://localhost:3000/api/test');
}); 