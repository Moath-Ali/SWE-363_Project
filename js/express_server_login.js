const express = require('express');
const router = express.Router();
const dbController = require('./dbController');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var cookieParser = require('cookie-parser')
router.use(cookieParser())

//needed for saving the session of the user



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
        dbController.checkUs(email).then((datas)=>{
          req.session.user=datas.userName;
          console.log(req.session.user);
          console.log("YOU ARE LOGGED IN")
        //send back the session id in a cookie
        res.cookie("Sid",req.session.id,{maxAge:9000000})
        res.cookie("user",req.session.user,{maxAge:9000000})
        //save the session id to the logged in user
        dbController.saveSID(req.session.id,email); 
        //add a flash before going to modules
        // res.redirect('/?username='+username);
        res.redirect('/')
        })
        
      }
      else{
        console.log("YOU ARE NOT LOGGED IN :(")
        //add a flash telling them to try again
        res.redirect('/login');
      }
    })
  })
  
  

});

router.get('/logout', (req, res) => {
  const sessionId = req.session.id;
  const userEmail = req.session.user;

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.clearCookie('Sid');
    res.clearCookie('user');

    res.redirect('/logout2'); 
  });
});
module.exports = router;