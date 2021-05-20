const _ = require("lodash");
const updateLikedVideo = async (req, res, next) => {
  const user = req.user;
  const likedvideos = user.likedvideos;
  const { videoId } = req.body;

  const findVideo = likedvideos.find((id) => id == videoId);
  if (findVideo) {
    likedvideos.forEach((id, index) => {
      if (videoId == id) {
        likedvideos.splice(index, 1);
      }
    });
  } else {
    likedvideos.push(videoId);
  }
  await user.save();
  res.json({ success: true, likedvideos });
};
const updateDisLikedVideo = async (req, res, next) => {
  const user = req.user;
  const dislikedvideos = user.dislikedvideos;
  const { videoId } = req.body;

  const findVideo = dislikedvideos.find((id) => id == videoId);
  if (findVideo) {
    dislikedvideos.forEach((id, index) => {
      if (videoId == id) {
        dislikedvideos.splice(index, 1);
      }
    });
  } else {
    dislikedvideos.push(videoId);
  }
  await user.save();
  res.json({ success: true, dislikedvideos });
};
const updateHistoryVideo = async (req, res, next) => {
  const user = req.user;
  const historyvideos = user.historyvideos;
  const { videoId } = req.body;

  const findVideo = historyvideos.find((id) => id == videoId);
  if (findVideo) {
    historyvideos.forEach((id, index) => {
      if (videoId == id) {
        historyvideos.splice(index, 1);
      }
    });
  } else {
    historyvideos.unshift(videoId);
  }
  await user.save();
  res.json({ success: true, historyvideos });
};
module.exports = {
  updateLikedVideo,
  updateDisLikedVideo,
  updateHistoryVideo,
};
