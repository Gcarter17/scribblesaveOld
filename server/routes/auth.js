const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try { // if we are currently logged in, then the request will have the user's information, so we want to ignore the password
    const user = await User.findById(req.user.id).select('-password'); // find the user
    res.json(user); // return the user
    // {
    //     "_id": "5e5f64f2fa29c64f84bbe71a",
    //     "name": "gavin",
    //     "email": "gavin@gmail.com",
    //     "date": "2020-03-04T08:21:06.130Z",
    //     "__v": 0
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// desc        Auth user and get token, Login based on email and password
// headers     Content-type application/json
// @access    Public
router.post(
  '/',
  // [
  //   check('email', 'Please include a valid email').isEmail(),
  //   check('password', 'Password is required').exists()
  // ],
  async (req, res) => {
    const errors = validationResult(req); // check users.js route for better commenting of this portion
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, googleEmail, token } = req.body;

    if (!googleEmail) {   // if they are logging in without google ------------------------------------------
      try {
        let user = await User.findOne({ email }); // same as email: email


        if (!user) { // if there is no user with that email then...
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // returns true or false based on whether or not req.body.password and the requested user's password match

        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // --------------- JWT boilerplate start

        const payload = {
          user: { // get the user id off of the user found by email
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
        // later a middleware will be made to utilize the generated token and validate it so the user can access protected routes
        // --------------- JWT boilerplate end

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    } else if (!email) {  // if they are logging in with google --------------------------------------------------
      try {
        let user = await User.findOne({ googleEmail });


        if (!user) { // if there is no user with that email then...
          return res.status(400).json({ msg: 'Invalid Credentials man' });
        }

        // const isMatch = await bcrypt.compare(token, user.token); // returns true or false based on whether or not req.body.password and the requested user's password match

        // if (!isMatch) {
        //   return res.status(400).json({ msg: 'Invalid Credentials dude' });
        // }

        // --------------- JWT boilerplate start

        const payload = {
          user: { // get the user id off of the user found by email
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
        // later a middleware will be made to utilize the generated token and validate it so the user can access protected routes
        // --------------- JWT boilerplate end

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }


  }
);

module.exports = router;


// try {
//   let user = await User.findOne({ email }); // same as email: email


//   if (!user) { // if there is no user with that email then...
//     return res.status(400).json({ msg: 'Invalid Credentials' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password); // returns true or false based on whether or not req.body.password and the requested user's password match

//   if (!isMatch) {
//     return res.status(400).json({ msg: 'Invalid Credentials' });
//   }
//   // --------------- JWT boilerplate start

//   const payload = {
//     user: { // get the user id off of the user found by email
//       id: user.id
//     }
//   };

//   jwt.sign(
//     payload,
//     config.get('jwtSecret'),
//     {
//       expiresIn: 360000
//     },
//     (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     }
//   );
//   // later a middleware will be made to utilize the generated token and validate it so the user can access protected routes
//   // --------------- JWT boilerplate end

// } catch (err) {
//   console.error(err.message);
//   res.status(500).send('Server Error');
// }