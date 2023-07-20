const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const { login, authenticate } = require('./server/databaseFunctions.js');

const app = express();
const port = 2000;

app.use(cors(), bodyParser.json(), fileUpload());

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

app.post('/newdefectreport', (req, res) => {
  const defectReport = req.body;
  console.log(defectReport);
  res.send('123');
});


app.post('/newdefectphoto', (req, res) => {
  const file = req.files?.file;
  const id = req.body.id;

  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const uniqueFileName = `${id}_${Date.now()}_${file.name}`;
  const filePath = path.join(uploadDir, uniqueFileName);
  file.mv(filePath, (err) => {
    if (err) {
      console.error(`Error saving the file ${uniqueFileName}:`, err);
      return res.status(500);
    }
    return res.status(200);
  });
});

app.post('/newsuggestionreport', (req, res) => {
  const suggestionReport = req.body;
  console.log(suggestionReport);
  res.send('123');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});