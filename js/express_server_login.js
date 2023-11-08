const express = require('express');
const router = express.Router();
const dbController = require('./dbController');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Registration route
router.post('/register', (req, res) => {
  const { userName, email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return console.error(err);
    }

    dbController.insertUser(userName, email, hash);
    res.redirect('/login');
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  //this method will return the password hashed to compare with the entered one then return true if it's correct
  const validUser = dbController.checkUser(email).then((data)=>{
    bcrypt.compare(password,data.password,(err,result)=>{
      if(result){
        console.log("YOU ARE LOGGED IN")
      }
      else{
        console.log("YOU ARE NOT LOGGED IN :(")
      }
    })
  })
  
  res.redirect('/login');

});

module.exports = router;