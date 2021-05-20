const express = require('express');
const app = express();
const queries = require('../database/schema.js');
const cors = require('cors');

// serve static files from dist dir
app.use(express.static(__dirname + '/../client/dist'));

// middleware
// use express.json for parsing JSON
app.use(express.json());
// use cors middleware for enabling CORS with various options
app.use(cors());

// get requests
app.get('/api/compensation', (req, res) => {
  if (req.body.experienceLevel === 'newGrad') {
    queries.getNewGrads(req.body.company, req.body.gender, (err, data) => {
      if (err) {
        res.status(404).send(err);
       } else {
        var sum = 0;
         var avg = 0;
         for (var i = 0; i < data.length; i++) {
           sum += data[i].compensation;
         }
         avg = parseInt(sum / data.length);
         console.log(data);
         res.send({averageSalary: avg});
       }
    })
  } else if (req.body.experienceLevel === 'midLevel') {
    queries.getMids(req.body.company, req.body.gender, (err, data) => {
      if (err) {
        res.status(404).send(err);
       } else {
         var sum = 0;
         var avg = 0;
         for (var i = 0; i < data.length; i++) {
           sum += data[i].compensation;
         }
         avg = parseInt(sum / data.length);
         console.log(data);
         res.send({averageSalary: avg});
       }
    })
  } else {
    queries.getExperts(req.body.company, req.body.gender, (err, data) => {
      if (err) {
        res.status(404).send(err);
       } else {
        var sum = 0;
         var avg = 0;
         for (var i = 0; i < data.length; i++) {
           sum += data[i].compensation;
         }
         avg = parseInt(sum / data.length);
         console.log(data);
         res.send({averageSalary: avg});
       }
    })
  }
});

app.get('/api/average', (req, res) => {
  queries.getAllAvg((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  })
});

// set port where server will listen
const port = 3000;

// tell server to listen on predefined port
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
