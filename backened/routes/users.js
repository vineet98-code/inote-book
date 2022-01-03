var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwt = require("jsonwebtoken");


// Registration handler
router.post('/register', async (req, res, next) => {
  console.log(req.body);
  try {
    var user = await User.create(req.body);
    
    var token = await user.signToken();
    res.status(200).json({ user: user.userJSON(token) });
  } catch (err) {
    next(err);
    }
});
  
// Login handler

router.post('/login', async (req, res, next) => {
  var { email, password } = req.body;
  if(!email || !password) {
    return res.status(422).json({ error: 'You must provide email and password'});
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ message: 'Email not registered' });
      } 
    var result  = await user.verifyPassword(password);
    if(!result) {
      return res.status(400).json({ error: 'Invalid password' });
    } 
    // Generate token
    var token = await user.signToken();
    res.json({ user: user.userJSON(token)});
    
  } catch (err) {
    next(err);
  }
});

module.exports = router;