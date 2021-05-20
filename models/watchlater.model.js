const mongoose = require("mongoose");
const { Video } = require("./videos.model");
const { Schema } = mongoose;

const watchlaterSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  videoIds: [{ type: mongoose.Types.ObjectId, ref: Video }],
});

const WatchLater = mongoose.model("WatchLater", watchlaterSchema);

module.exports = { WatchLater };
