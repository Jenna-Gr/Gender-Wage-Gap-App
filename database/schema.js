const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/compensation', { useNewUrlParser: true });
const db = mongoose.connection;

// verify connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
 console.log('successful connection to mongodb!');
});

// create a new schema
const Schema = mongoose.Schema;

let userSchema = new Schema({
  company: String,
  gender: String,
  location: String,
  yoe: Number,
  compensation: Number
});

// create a model
let User = mongoose.model('User', userSchema);

function upsertUser(userObj) {
  User.create(userObj, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log('Succesffully added to db!');
    }
  });
}

const getAllAvg = (cb) => {
  console.log('made it here');
  User.aggregate([{$group: {_id:{company:"$company", gender:"$gender"}, avgSalary: {$avg: "$compensation"}}}], (error, user) => {
   if (error) {
     cb(error, null);
   } else {
     cb(null, user);
   }
  });
};

const getNewGrads = (company, gender, cb) => {
  User.find({company: company, gender: gender, yoe: { $lt: 2 }}, (error, user) => {
   if (error) {
     cb(error, null);
   } else {
     cb(null, user);
   }
  });
};

const getMids = (company, gender, cb) => {
  User.find({company: company, gender: gender, yoe: { $gte: 2, $lt: 5 }}, (error, user) => {
   if (error) {
     cb(error, null);
   } else {
     cb(null, user);
   }
  });
};

const getExperts = (company, gender, cb) => {
  User.find({company: company, gender: gender, yoe: { $gte: 5 }}, (error, user) => {
   if (error) {
     cb(error, null);
   } else {
     cb(null, user);
   }
  });
};


module.exports = {
  upsertUser: upsertUser,
  getAllAvg: getAllAvg,
  getNewGrads: getNewGrads,
  getMids: getMids,
  getExperts: getExperts
};

// db.users.aggregate({$group: {_id:{company:"$company", gender:"$gender"}, avgSalary: {$avg: "$compensation"}}})