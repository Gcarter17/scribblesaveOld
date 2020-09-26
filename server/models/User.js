const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: function () {
      this.googleEmail ? false : true
    },
    unique: function () {
      this.email === "" ? false : true
    }
  },
  googleEmail: {   // ----------------- added for google
    type: String,
    unique: function () {
      this.googleEmail === "" ? false : true
    }
  },
  // googleId: {   // ----------------- added for google
  //   type: String,
  //   unique: true
  // },
  token: {    // ------------------- added for google
    type: String,
    unique: function () {
      this.token === "" ? false : true
    }
  },
  password: {
    type: String,
    required: function () {
      this.googleId ? false : true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
