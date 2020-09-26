// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// // const config = require('config');
// const passport = require('passport')
// const cors = require('cors')


// // @route     GET api/google
// // @desc      Register a user with google
// // @access    Public
// router.get('/', passport.authenticate('google', {
//     // scope is what we want to retrieve from the user (profile, emails, etc), check google api to see what can be added in here
//     scope: ['https://www.googleapis.com/auth/userinfo.profile',
//         'https://www.googleapis.com/auth/userinfo.email']
// }), async (req, res) => {
//     try {
//         const payload = {
//             user: {
//                 id: req.user.id
//             }
//         }

//         jwt.sign(payload, keys.jwtSecret,
//             {
//                 expiresIn: 360000
//             }, (err, token) => {
//                 if (err) throw err;
//                 res.json({ token })
//             }
//         )
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

// router.get(
//     '/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     })
// )

// module.exports = router;















// // -------------------------------- OLD VERSION AT BOTTOM -----------------------------
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const { check, validationResult } = require('express-validator/check');

// const User = require('../models/User');

// // @route     POST api/auth/google
// // @desc      Register a user with google
// // @access    Public
// router.post(
//     '/',
//     [
//         check('name', 'Please add name')
//             .not()
//             .isEmpty(),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name, googleEmail, token } = req.body;

//         try {
//             let user = await User.findOne({ googleEmail });

//             if (user) {
//                 return res.status(400).json({ msg: 'User already exists' });
//             }

//             user = new User({
//                 name: name,
//                 email: '',
//                 googleEmail: googleEmail,
//                 token: token,
//                 password: password
//             });

//             await user.save();

//             const payload = {
//                 user: {
//                     id: user.id
//                 }
//             };

//             jwt.sign(
//                 payload,
//                 config.get('jwtSecret'),
//                 {
//                     expiresIn: 360000
//                 },
//                 (err, token) => {
//                     if (err) throw err; // if theres an error then throw err, otherwise respond with the token
//                     res.json({ token });
//                 }
//             );
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// module.exports = router;












































