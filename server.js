const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const {
  newDb,
  login,
  authenticate,
  newDefectReport,
  newDefectPhoto,
  newSuggestionReport,
  getDefectReports,
  getDefectReportsAll,
  getSuggestionReports,
  getSuggestionReportsAll,
  resolveDefectReport,
  unresolveDefectReport,
  hideDefectReport
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
      res.status(401).send('Session token error');
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
      res.status(401).send('Invalid Credentials');
    }
  });
});

app.get('/api/getdefectreports', (req, res) => {
  const username = req.query.username;
  getDefectReports(username).then((defectReports) => {
    res.send(defectReports);
  });
});

app.get('/api/getdefectreportsall', (req, res) => {
  const token = req.query.token;
  authenticate(token).then((user) => {
    if (!user) {
      res.status(401).send('Not a user');
      return;
    }
    if (user.admin) {
      getDefectReportsAll().then((defectReports) => {
        res.send(defectReports);
      });
    } else {
      res.status(401).send('Not admin');
    }
  });
});

app.get('/api/getsuggestionreports', (req, res) => {
  const username = req.query.username;
  getSuggestionReports(username).then((suggestionReports) => {
    res.send(suggestionReports);
  });
});

app.get('/api/getsuggestionreportsall', (req, res) => {
  const token = req.query.token;
  authenticate(token).then((user) => {
    if (!user) {
      res.status(401).send('Not a user');
      return;
    }
    if (user.admin) {
      getSuggestionReportsAll().then((suggestionReports) => {
        res.send(suggestionReports);
      });
    } else {
      res.status(401).send('Not admin');
    }
  });
});

app.get('/api/resolvedefectreport', (req, res) => {
  const uid = req.query.uid;
  const token = req.query.token;
  authenticate(token).then((user) => {
    if (!user) {
      res.status(401).send('Not a user');
      return;
    }
    if (user.admin) {
      resolveDefectReport(uid).then(() => {
        res.sendStatus(200);
      });
    } else {
      res.status(401).send('Not admin');
    }
  });
});

app.get('/api/unresolvedefectreport', (req, res) => {
  const uid = req.query.uid;
  const token = req.query.token;
  authenticate(token).then((user) => {
    if (!user) {
      res.status(401).send('Not a user');
      return;
    }
    if (user.admin) {
      unresolveDefectReport(uid).then(() => {
        res.sendStatus(200);
      });
    } else {
      res.status(401).send('Not admin');
    }
  });
});

app.get('/api/hidedefectreport', (req, res) => {
  const uid = req.query.uid;
  const token = req.query.token;
  authenticate(token).then((user) => {
    if (!user) {
      res.status(401).send('Not a user');
      return;
    }
    if (user.admin) {
      hideDefectReport(uid).then(() => {
        res.sendStatus(200);
      });
    } else {
      res.status(401).send('Not admin');
    }
  });

});

app.post('/api/newdefectreport', (req, res) => {
  const defectReport = req.body;
  const categories = ['Lights', 'Projector/Sound System', 'Air-Con', 'Other Electrical', 'Toilet', 'Building', 'Other']
  const updatedDefectReport = {
    ...defectReport,
    category: categories[defectReport.category - 1],
  }
  newDefectReport(updatedDefectReport)
    .then((uid) => {
      res.status(200).send(uid);
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

  newDefectPhoto(uid, ext);

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
  newSuggestionReport(suggestionReport)
    .then((uid) => {
      res.status(200).send(uid);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});