const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  "/",
  [auth, [check("title", "title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { link, title, content, checked, favorite } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        title,
        link,
        content,
        checked,
        favorite
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { link, title, content, checked, favorite, experience } = req.body;
  // Build contact object
  const contactFields = {};
  if (title) contactFields.title = title;
  if (link) contactFields.link = link;
  if (content) contactFields.content = content;
  if (favorite) {
    contactFields.favorite = favorite
  } else if (!favorite) {
    contactFields.favorite = false
  }
  if (checked) {
    contactFields.checked = checked
  } else if (!checked) {
    contactFields.checked = false
  }
  if (experience) contactFields.experience = experience
  contactFields.date = Date()   // on update, automatically updates date to current date so react filter moves that item to top
  // console.log(req.params.id, 'id from contact')

  // console.log(Object.keys(contactFields).length === 0 && contactFields.constructor === Object)

  if (Object.keys(contactFields).length > 3) {
    try {

      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({ msg: "Contact not found" });

      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }
      // console.log(contactFields) logs what the update obj looks l ike
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: contactFields }
        // { new: true }
      );

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } else {
    try {
      // let body = req.body.description // assigning just the desc and not id to a variable
      let contact = await Contact.findById(req.body._id);
      if (!contact) return res.status(404).json({ msg: "Contact not found" });
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      // contact.experience.unshift(req.body)  adds to the array the entire body, which is solely the id of the now nested card

      contact.experience.unshift(req.body.description)
      await contact.save()

      res.json(contact)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

  }

});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;


// // @route     PUT api/contacts/children/:id
// // @desc      Update contact children
// // @access    Private
// router.put("/children/:id", auth, async (req, res) => {
//   const { title, link, content } = req.body;
//   // DONT FORGET TO ADD auth  ------------------------------------------- TODO
//   // Build contact object
//   const contactFields = {};
//   if (title) contactFields.title = title;
//   if (link) contactFields.link = link;
//   if (content) contactFields.content = content;
//   if (type) contactFields.type = type;

//   try {
//     let contact = await Contact.findById(req.params.id);

//     if (!contact) return res.status(404).json({ msg: "Contact not found" });

//     // Make sure user owns contact
//     if (contact.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }

//     contact.children.unshift(contactFields);

//     res.json(contact);
//   } catch (err) {
//     console.error(er.message);
//     res.status(500).send("Server Error");
//   }
// });
