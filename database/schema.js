const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/compensation', { useNewUrlParser: true });
const connection = mongoose.connection;

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
  compensation: String
});

// create a model
let User = mongoose.model('User', userSchema);

function upsertUser(userObj) {
  User.save(userObj, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

const getUsers = (body, cb) => {
  User.findOne({ company: body.company, gender: body.gender, yoe: body.yoe}, (error, user) => {
   if (error) {
     cb(error, null);
   } else {
     cb(null, user);
   }
  )
};


module.exports = {User, getUsers, upsertUser};