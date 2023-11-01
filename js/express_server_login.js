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
  
});

module.exports = router;