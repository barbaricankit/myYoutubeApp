const express = require('express');
const _ = require('lodash');
const { updateHistoryVideo } = require('../middleware/liked.middleware');
const { checkUser } = require('../middleware/middlewares');
const router = express.Router();

router
	.route('/:userId/history')
	.get(checkUser, async (req, res) => {
		const user = req.user;
		const populateVideoData = await user.populate('historyVideos ').execPopulate();
		res.json({ success: true, historyVideos: populateVideoData.historyVideos });
	})
	.post(checkUser, updateHistoryVideo);

module.exports = { router };
