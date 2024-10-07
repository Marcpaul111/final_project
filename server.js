const express = require('express');
const cors = require('cors');
const app = express();

// Use the CORS middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
  methods: ['GET', 'POST'], // Specify allowed methods if needed
}));

// Your API routes here
app.post('/api/checkout', (req, res) => {
  // Handle the request
});

app.listen(3000, () => console.log('Server is running on port 3000'));
