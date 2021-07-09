const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { checkUser } = require('../middleware/middlewares');
const { updateLikedVideo, updateDisLikedVideo } = require('../middleware/liked.middleware');
router
	.route('/:userId/like')
	.get(checkUser, async (req, res) => {
		const user = req.user;
		const populateVideoData = await user.populate('likedVideos').execPopulate();
		res.json({ success: true, likedVideos: populateVideoData.likedVideos });
	})
	.post(checkUser, updateLikedVideo);

router
	.route('/:userId/dislike')
	.get(checkUser, async (req, res) => {
		const user = req.user;

		const populateVideoData = await user.populate('dislikedVideos').execPopulate();
		res.json({
			success: true,
			dislikedVideos: populateVideoData.dislikedVideos
		});
	})
	.post(checkUser, updateDisLikedVideo);
module.exports = { router };
