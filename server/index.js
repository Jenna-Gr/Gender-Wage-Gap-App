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
// app.get('/compensation', (req, res) => {
//  queries.getUsers(req.query.body, (err, data) => {
//    if (err) {
//      res.status(404).send(err);
//     } else {
//       res.send(data);
//     }
//   })
// });

// set port where server will listen
const port = 3000;

// tell server to listen on predefined port
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
