const express = require("express");
const _ = require("lodash");
const router = express.Router();

const { checkUser } = require("../middleware/middlewares");
const {
  findWatchLater,
  updateWatchLater,
  addNewWatchLater,
} = require("../middleware/watchlater.middleware");

router
  .route("/:userId/watchlater")
  .get(checkUser, findWatchLater, async (req, res) => {
    const watchLater = req.watchLater;
    const populateVideos = await watchLater.populate("videoIds").execPopulate();
    res.json({ success: true, watchLater: populateVideos });
  })

  .post(checkUser, findWatchLater, updateWatchLater, addNewWatchLater);

module.exports = { router };
