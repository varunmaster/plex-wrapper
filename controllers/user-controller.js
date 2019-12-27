const { User, Shows, Requests, Movies } = require("../models");
const handle = require("../utils/promise-handler.js");
const jwt = require("jsonwebtoken");
const secret = "DRqjrk2hnhbg9ngt@1!"

const register = (req, res) => {
    // console.log("request: ", req);
    const { firstName, lastName, email, password } = req.body;

    User.create({
        firstName,
        lastName,
        email,
        password
    })
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
};

// function for logging in a user
// this will run when user POSTs to '/api/user/login'
const login = async (req, res) => {
    // get email and password out of req.body
    const { email, password } = req.body;
  
    // find user based on email
    const [findUserErr, userInfo] = await handle(User.findOne({ email }));
  
    if (findUserErr) {
    //   console.log(findUserErr);
      res.status(500).json({
        error: 'Internal error, try again'
      });
    } else if (!userInfo) {
      res.status(401).json({
        error: 'Incorrect email'
      });
    } else {
      // check to see if password matches user's password
      const [pwErr, same] = await handle(userInfo.validPassword(password));
  
      if (pwErr) {
        res.status(500).json({
          error: 'Internal error please try again!'
        });
      } else if (!same) {
        res.status(401).json({
          error: 'Incorrect password!'
        });
      } else {
        // issue our JWT
        const payload = {
          id: userInfo.id,
          email: userInfo.email
        };
        // sign jwt
        const token = jwt.sign(payload, secret, {
          expiresIn: '2h'
        });
  
        // respond with web token to the front end
        res.status(200).json(token);
  
        // if you want to use session cookies instead...
        // res.cookie('token', token, {httpOnly: true})
      }
    }
  };

module.exports = {
    register,
    login
};
