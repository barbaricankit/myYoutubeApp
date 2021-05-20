const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { checkUser } = require("../middleware/middlewares");
const {
  updateLikedVideo,
  updateDisLikedVideo,
} = require("../middleware/liked.middleware");
router
  .route("/:userId/like")
  .get(checkUser, async (req, res) => {
    const user = req.user;
    const populateVideoData = await user.populate("likedvideos").execPopulate();
    res.json({ success: true, likedvideos: populateVideoData.likedvideos });
  })
  .post(checkUser, updateLikedVideo);

router
  .route("/:userId/dislike")
  .get(checkUser, async (req, res) => {
    const user = req.user;

    const populateVideoData = await user
      .populate("dislikedvideos")
      .execPopulate();
    res.json({
      success: true,
      dislikedvideos: populateVideoData.dislikedvideos,
    });
  })
  .post(checkUser, updateDisLikedVideo);
module.exports = { router };
