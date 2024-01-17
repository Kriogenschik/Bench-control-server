// const config = require('../config/db');
// const bcrypt = require('bcryptjs');

// const UserSchema = mongoose.Schema({
//   login: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
// })

// const User = module.exports = mongoose.model('User', UserSchema);

// module.exports.getUserByLogin = function(login, callback) {
//   const query = {login: login};
//   User.findOne(query, callback);
// };

// module.exports.comparePass = function(passFromUser, userDBPass, callback) {
//   bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
//     if (err) throw err;
//     callback(null, isMatch);
//   })
// };