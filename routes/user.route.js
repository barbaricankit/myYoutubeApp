const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { WatchLater } = require('../models/watchlater.model');
const { checkUser } = require('../middleware/middlewares');
const { Playlist } = require('../models/playlist.model');

router.route('/:userId/user').get(checkUser, async (req, res) => {
	const user = req.user;
	const watchlater = await WatchLater.findOne({ userId: user._id });
	const playlists = await Playlist.find({ userId: user._id });

	const { _id: userId, likedVideos, dislikedVideos, historyVideos } = user;
	res.json({
		success: true,
		message: 'Valid user',
		userId,
		likedVideos,
		dislikedVideos,
		playlists,
		watchlater: watchlater ? watchlater : [],
		historyVideos
	});
});
router.route('/signin').post(async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (user) {
		if (user.password === password) {
			const watchlater = await WatchLater.findOne({ userId: user._id });
			const playlists = await Playlist.find({ userId: user._id });

			const { _id: userId, likedVideos, dislikedVideos, historyVideos, firstname, lastname } = user;
			const userInitials = firstname.substring(0, 1) + lastname.substring(0, 1);
			res.json({
				success: true,
				message: 'Valid user',
				userId,
				userInitials,
				likedVideos,
				dislikedVideos,
				playlists,
				watchlater: watchlater ? watchlater : [],
				historyVideos
			});
		} else {
			res.json({
				success: false,
				message: 'Invalid password'
			});
		}
	} else res.json({ success: false, message: 'Invalid Username' });
});

router.route('/signup').post(async (req, res) => {
	const { firstname, lastname, email, username, password } = req.body;
	const findUser = await User.find({ username });
	if (findUser.username) {
		res.json({ success: false, message: 'Username is already in use' });
	} else {
		const newuser = new User({
			firstname,
			lastname,
			email,
			username,
			password
		});
		newuser.save();
		const userInitials = firstname.substring(0, 1) + lastname.substring(0, 1);
		res.json({ success: true, userId: newuser._id, userInitials });
	}
});

module.exports = { router };
