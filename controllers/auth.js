const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require("../models/user");

const getAuthHandler = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByLogin(login, (err, user) => {
    if (err) throw err;
    if(!user) {
      return res.json({success: false, msg: "User was not found..."});
    }
    User.comparePass(password, user.password, (err, isMatch) => {
    if (err) throw err;
      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 3600
        });

        res.json({
          success: true,
          token: "JWT" + token,
          user: {
            id: user._id,
            login: user.login
          }
        })
      } else 
      return res.json({success: false, msg: "Wrong Password"});
    });
  })
  // fs.readFile("./data/staff.json", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(JSON.parse(data));
  //   }
  // });
};

module.exports = {
  getAuthHandler,
};