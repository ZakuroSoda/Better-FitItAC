const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const { login,
  authenticate,
  newdefectreport,
  newdefectphoto,
  newsuggestionreport,
  getdefectreports
} = require('./server/databaseFunctions.js');

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

app.get('/getdefectreports', (req, res) => {
  const username = req.query.username;
  getdefectreports(username).then((defectReports) => {
    if (defectReports.length > 0) {
      res.send(defectReports);
    } else {
      res.sendStatus(404);
    }
  });
});

app.post('/newdefectreport', (req, res) => {
  const defectReport = req.body;
  const categories = ['Lights', 'Projector/Sound System', 'Air-Con', 'Other Electrical', 'Toilet', 'Building', 'Other']
  const updatedDefectReport = {
    ...defectReport,
    category: categories[defectReport.category - 1],
  }
  console.log(updatedDefectReport)
  newdefectreport(updatedDefectReport)
    .then((uid) => {
      res.send(uid);
    });

});


app.post('/newdefectphoto', (req, res) => {
  const file = req.files?.file;
  const uid = req.body.id;

  const uploadDir = path.join(__dirname, 'public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const ext = path.extname(file.name);
  const uniqueFileName = `${uid}${ext}`;
  const filePath = path.join(uploadDir, uniqueFileName);

  newdefectphoto(uid, ext);

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
  newsuggestionreport(suggestionReport)
    .then((uid) => {
      res.send(uid);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});