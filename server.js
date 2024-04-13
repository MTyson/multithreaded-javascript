const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port 3000

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send('Hello!');
});

// Handle any other routes (optional, can be customized)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

