const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { checkUser } = require("../middleware/middlewares");
const {
  checkPlayList,
  findPlaylistName,
  updatePlayList,
  checkInvalidPlaylist,
  addNewPlayList,
} = require("../middleware/playlist.middleware");
router
  .route("/:userId/:playlistname")
  .get(
    checkUser,
    checkPlayList,
    findPlaylistName,
    checkInvalidPlaylist,
    async (req, res) => {
      const playlistName = req.playlistName;
      const populateVideoData = await playlistName
        .populate(`videoIds`)
        .execPopulate();
      if (playlistName)
        res.json({ success: true, playlists: populateVideoData });
      else res.json({ success: false, message: "Invalid playlist name" });
    }
  )
  .post(
    checkUser,
    checkPlayList,
    findPlaylistName,
    updatePlayList,
    addNewPlayList
  );

module.exports = { router };
