const express = require('express');
import { v4 as uuidv4 } from 'uuid';

const path = require('path');
const app = express();
const port = 2000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('API for FixItAC++');
});

app.get('/getusername', (req, res) => {
  const token = req.query.token;
  // checks db for token, returns username if session is valid
  res.set({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });
  res.send(`${token}: john.tan`);
});

app.get('/newtoken', (req, res) => {
  const username = req.query.username;
  // checks db for username, returns new token if user exists
  res.set({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });
  res.send(`${username}: 1234567890`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});