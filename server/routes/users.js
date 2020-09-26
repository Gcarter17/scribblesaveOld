const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
// const uuidv4 = require("uuid").v4;
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  "/",
  // [
  //   check('name', 'Please add name')
  //     .not()
  //     .isEmpty(),
  //   check('email', 'Please include a valid email').isEmail(),
  //   check(
  //     'password',
  //     'Please enter a password with 6 or more characters'
  //   ).isLength({ min: 6 })
  // ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, googleEmail, token } = req.body;

    try {
      let user = email
        ? await User.findOne({ email })
        : await User.findOne({ googleEmail });

      // let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name: name,
        email: email ? email : "",
        googleEmail: googleEmail ? googleEmail : "",
        token: token ? token : uuidv4(),
        password: password ? password : "",
      });

      const salt = await bcrypt.genSalt(10);

      if (user.password) {
        // if signing in with password, hash the password, if token with google, hash the token
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err; // if theres an error then throw err, otherwise respond with the token
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/google",
  [check("name", "Please add name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, googleEmail, token } = req.body;

    try {
      let user = await User.findOne({ googleEmail });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name: name,
        email: "",
        googleEmail: googleEmail,
        token: token,
        password: password,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err; // if theres an error then throw err, otherwise respond with the token
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
