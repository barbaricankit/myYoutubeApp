const { Playlist } = require("../models/playlist.model");
const _ = require("lodash");
const checkPlayList = async (req, res, next) => {
  const { playlistname } = req.params;
  const { videoId } = req.body;
  const userId = req.userId;
  const playList = await Playlist.find({ userId });
  if (playList.length > 0) {
    req.playlistname = playlistname;
    req.videoId = videoId;
    req.playList = playList;
    next();
  } else {
    const newPlaylist = new Playlist({
      userId,
      playlistName: playlistname,
      videoIds: [videoId],
    });
    const user = req.user;

    const updatedUser = _.extend(user, { playlists: [newPlaylist._id] });

    await updatedUser.save();
    await newPlaylist.save();
    res.json({ success: true, playlists: newPlaylist });
  }
};
const findPlaylistName = async (req, res, next) => {
  const playlistname = req.playlistname;
  const playList = req.playList;
  const playlistName = await playList.find(
    ({ playlistName }) => playlistName === playlistname
  );
  req.playlistName = playlistName;
  next();
};
const checkInvalidPlaylist = async (req, res, next) => {
  const playlistName = req.playlistName;
  if (playlistName) {
    next();
  } else {
    res.json({ success: false, message: "Invalid Playlist Name" });
  }
};
const updatePlayList = async (req, res, next) => {
  const playlistName = req.playlistName;
  const videoId = req.videoId;

  if (playlistName) {
    const updatePlaylistVideo = playlistName.videoIds.find(
      (id) => id == videoId
    );

    if (updatePlaylistVideo) {
      playlistName.videoIds.forEach((video, index) => {
        if (videoId == video) {
          playlistName.videoIds.splice(index, 1);
        }
      });
    } else {
      playlistName.videoIds.push(videoId);
    }
    playlistName.save();
    res.json({ success: true, playlists: playlistName });
  } else {
    next();
  }
};
const addNewPlayList = async (req, res, next) => {
  const playlistname = req.playlistname;
  const userId = req.userId;
  const videoId = req.videoId;

  const playList = new Playlist({
    userId,
    playlistName: playlistname,
    videoIds: [videoId],
  });
  const user = req.user;

  await user.playlists.push(playList._id);
  await playList.save();
  await user.save();
  res.json({ success: true, playlists: playList });
};
module.exports = {
  checkPlayList,
  findPlaylistName,
  checkInvalidPlaylist,
  updatePlayList,
  addNewPlayList,
};
