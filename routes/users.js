const express = require("express");

const authentification = require("../middlewares/authentification");
const admin = require("../middlewares/admin");

const router = express.Router();
const User = require("../Models/user");

// @route    GET users/
// @desc     get users
// @access   Private
router.get("/", [authentification, admin], async (req, res) => {
  try {
    const users = req.query.role
      ? await User.find({ role: req.query.role })
      : await User.find();
    if (!users) {
      return res.status(404).send({ msg: "no users were found" });
    }
    return res.send(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// @route    DELETE users/:id
// @desc     delete a  user
// @access   Private
router.delete("/:id", [authentification, admin], async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ msg: "The user with the given ID was not found." });

    res.send({ msg: "user removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
