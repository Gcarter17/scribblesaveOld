const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false
  },
  experience: [
    {
      // description: {
      //   type: String
      // }
      description: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contacts'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
