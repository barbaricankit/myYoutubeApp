const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { checkUser } = require("../middleware/middlewares");

router.route("/:userId/user").get(checkUser, async (req, res) => {
  const user = req.user;
  const populateWatchLater = await user.populate("watchlater").execPopulate();
  const populatePlayList = await populateWatchLater
    .populate("playlists")
    .execPopulate();
  const {
    _id: userId,
    likedvideos,
    dislikedvideos,
    playlists,
    watchlater,
    historyvideos,
  } = populatePlayList;
  res.json({
    success: true,
    message: "Valid user",
    userId,
    likedvideos,
    dislikedvideos,
    playlists,
    watchlater,
    historyvideos,
  });
});
router.route("/signin").post(async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });
  if (findUser) {
    if (findUser.password === password) {
      const populateWatchLater = await findUser
        .populate("watchlater")
        .execPopulate();
      const populatePlayList = await populateWatchLater
        .populate("playlists")
        .execPopulate();

      const {
        _id: userId,
        likedvideos,
        dislikedvideos,
        playlists,
        watchlater,
        historyvideos,
        firstname,
        lastname,
      } = populatePlayList;
      const userInitials = firstname.substring(0, 1) + lastname.substring(0, 1);
      res.json({
        success: true,
        message: "Valid user",
        userId,
        userInitials,
        likedvideos,
        dislikedvideos,
        playlists,
        watchlater,
        historyvideos,
      });
    } else {
      res.json({
        success: false,
        message: "InValid password",
      });
    }
  } else res.json({ success: false, message: "InValid Username" });
});

router.route("/signup").post(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const findUser = await User.find({ username });
  if (findUser.username) {
    res.json({ success: false, message: "Username is already in use" });
  } else {
    const newuser = new User({
      firstname,
      lastname,
      email,
      username,
      password,
    });
    newuser.save();
    const userInitials = firstname.substring(0, 1) + lastname.substring(0, 1);
    res.json({ success: true, userId: newuser._id, userInitials });
  }
});

module.exports = { router };
