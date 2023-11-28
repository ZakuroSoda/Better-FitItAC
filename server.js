const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const { login,
  authenticate,
  newdefectreport,
  newdefectphoto,
  newsuggestionreport,
  getdefectreports,
  getsuggestionreports,
  getdefectreportsall,
  getsuggestionreportsall,
  resolvedefectreport,
  hidedefectreport,
  newDb
} = require('./server/databaseFunctions.js');

const app = express();
const port = 2000;
const mode = process.env.MODE; console.log(mode == 'PRODUCTION' ? 'Running in production mode' : 'Running in development mode');

newDb();

app.use(cors(), bodyParser.json(), fileUpload());

//Production (won't be used in development mode since React is running on port 3000)
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'build/uploads')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api', (req, res) => {
  res.send('API for FixItAC++');
});

app.get('/api/getusername', (req, res) => {
  const token = req.query.token;
  authenticate(token).then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(401);
    }
  });
});

app.get('/api/newtoken', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  login(username, password).then((token) => {
    if (token) {
      res.send(token);
    } else {
      res.status(401).send('Invalid School ID');
    }
  });
});

app.get('/api/getdefectreports', (req, res) => {
  const username = req.query.username;
  getdefectreports(username).then((defectReports) => {
    if (defectReports.length > 0) {
      res.send(defectReports);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/api/getsuggestionreports', (req, res) => {
  const username = req.query.username;
  getsuggestionreports(username).then((suggestionReports) => {
    if (suggestionReports.length > 0) {
      res.send(suggestionReports);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/api/getdefectreportsall', (req, res) => {
  getdefectreportsall().then((defectReports) => {
    if (defectReports.length > 0) {
      res.send(defectReports);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/api/getsuggestionreportsall', (req, res) => {
  getsuggestionreportsall().then((suggestionReports) => {
    if (suggestionReports.length > 0) {
      res.send(suggestionReports);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/api/resolvedefectreport', (req, res) => {
  const uid = req.query.uid;
  resolvedefectreport(uid).then(() => {
    res.sendStatus(200);
  });
});

app.get('/api/hidedefectreport', (req, res) => {
  const uid = req.query.uid;
  hidedefectreport(uid).then(() => {
    res.sendStatus(200);
  });
});

app.post('/api/newdefectreport', (req, res) => {
  const defectReport = req.body;
  const categories = ['Lights', 'Projector/Sound System', 'Air-Con', 'Other Electrical', 'Toilet', 'Building', 'Other']
  const updatedDefectReport = {
    ...defectReport,
    category: categories[defectReport.category - 1],
  }
  newdefectreport(updatedDefectReport)
    .then((uid) => {
      res.send(uid);
    });

});

app.post('/api/newdefectphoto', (req, res) => {
  const file = req.files?.file;
  const uid = req.body.id;

  const uploadDir = mode == 'PRODUCTION' 
  ? path.join(__dirname, 'build/uploads')
  : path.join(__dirname, 'public/uploads');

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

app.post('/api/newsuggestionreport', (req, res) => {
  const suggestionReport = req.body;
  newsuggestionreport(suggestionReport)
    .then((uid) => {
      res.send(uid);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});