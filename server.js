const express = require('express');

const { login, authenticate } = require('./server/databaseFunctions.js');

const path = require('path');
const app = express();
const port = 2000;

app.get('/', (req, res) => {
  res.send('API for FixItAC++');
});

app.get('/getusername', (req, res) => {
  res.set({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });

  const token = req.query.token;

  authenticate(token).then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(401);
    }
  });

});

app.get('/newtoken', (req, res) => {
  res.set({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });

  const username = req.query.username;

  login(username).then((token) => {
    if (token) {
      res.send(token);
    } else {
      res.sendStatus(401);
    }
  });  
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});