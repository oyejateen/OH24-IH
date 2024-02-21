const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up static directory for serving CSS, JS, and images
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// New route to handle API requests
app.get('/api/pets', async (req, res) => {
    const { type } = req.query; // Get the type of pet from query parameters
    const apiKey = 'WxR9uAaI0sD0QE1MIUSrXNXX3GeRXQ20HTNAlopxbMuNmdiv2W'; // Replace 'YOUR_API_KEY' with your actual Petfinder API key
  console.log("finding ", type)
    const apiUrl = `https://api.petfinder.com/v2/animals?type=${type}&location=miami`; // Construct API URL

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
      console.log(data);
        res.json(data); // Send fetched data back to client as JSON response
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
