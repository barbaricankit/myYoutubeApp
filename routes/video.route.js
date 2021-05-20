const express = require("express");
const router = express.Router();
const { Video } = require("../models/videos.model");

router
  .route("/videos")
  .get(async (req, res) => {
    const data = await Video.find({});
    res.json({ success: true, videos: data });
  })
  .post(async (req, res) => {
    const data = req.body;
    const findVideoInDatabase = await Video.findOne({
      youtube_id: data.youtube_id,
    });

    if (!findVideoInDatabase) {
      const video = new Video(data);
      const savedVideo = await video.save();
      res.json({ success: true, video: savedVideo });
    }
  });
router.route("video/:videoId").get(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findOne({ youtube_id: videoId });
  if (video) {
    res.json({ success: true, video });
  } else {
    res.json({ success: false, message: "Invalid Video Id" });
  }
});
module.exports = { router };
