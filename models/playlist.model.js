const mongoose = require("mongoose");
const { Video } = require("./videos.model");
const { Schema } = mongoose;

const playlistSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  playlistName: {
    type: String,
    required: [true, "playlist name is required"],
  },
  videoIds: [{ type: mongoose.Types.ObjectId, ref: Video }],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist };
