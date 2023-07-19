const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const { login, authenticate } = require('./server/databaseFunctions.js');

const path = require('path');
const app = express();
const port = 2000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('API for FixItAC++');
});

app.get('/getusername', (req, res) => {
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
  const username = req.query.username;
  login(username).then((token) => {
    if (token) {
      res.send(token);
    } else {
      res.sendStatus(401);
    }
  });  
  
});

app.post('/newdefectreport', bodyParser.json(), (req, res) => {
  const defectReport = req.body;
  console.log(defectReport);
  res.send('123');
});


app.post('/newdefectphoto', (req, res) => {
  //gay
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});