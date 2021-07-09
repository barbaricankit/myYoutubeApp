const mongoose = require('mongoose');
const { Playlist } = require('./playlist.model');
const { Video } = require('./videos.model');
const { WatchLater } = require('./watchlater.model');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstname: String,
	lastname: String,
	email: String,
	username: String,
	password: String,
	likedvideos: [ { type: Schema.Types.ObjectId, ref: Video } ],
	dislikedvideos: [ { type: Schema.Types.ObjectId, ref: Video } ],
	historyvideos: [ { type: Schema.Types.ObjectId, ref: Video } ]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
