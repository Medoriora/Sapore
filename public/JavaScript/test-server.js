const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(5001, () => {
  console.log('Test server running on http://localhost:5001');
});