const express = require('express');
const router = express.Router();
const dbController = require('./dbController');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cookieParser = require('cookie-parser')
router.use(cookieParser())

//needed for saving the session of the user
const session = require('express-session')
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



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

  dbController.checkUser(email).then((data)=>{
    bcrypt.compare(password,data.password,(err,result)=>{
      if(result){
        console.log("YOU ARE LOGGED IN")
        //send back the session id in a cookie
        res.cookie("Sid",req.session.id,{maxAge:9000000})
        //save the session id to the logged in user
        dbController.saveSID(req.session.id,email); 
        //add a flash before going to modules
        res.redirect('/modules');
      }
      else{
        console.log("YOU ARE NOT LOGGED IN :(")
        //add a flash telling them to try again
        res.redirect('/login');
      }
    })
  })
  
  

});

module.exports = router;