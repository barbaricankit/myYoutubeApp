const { WatchLater } = require('../models/watchlater.model');

const findWatchLater = async (req, res, next) => {
	const userId = req.userId;
	const watchLater = await WatchLater.findOne({ userId });
	req.watchLater = watchLater;
	next();
};
const updateWatchLater = async (req, res, next) => {
	const watchLater = req.watchLater;
	const { videoId } = req.body;
	req.videoId = videoId;
	if (watchLater) {
		const findVideo = watchLater.videoIds.find((id) => id == videoId);
		if (findVideo) {
			watchLater.videoIds.forEach((id, index) => {
				if (id == videoId) {
					watchLater.videoIds.splice(index, 1);
				}
			});
			await watchLater.save();
			res.json({ success: true, watchLater });
		} else {
			watchLater.videoIds.push(videoId);

			await watchLater.save();
			res.json({ success: true, watchLater });
		}
	} else {
		next();
	}
};
const addNewWatchLater = async (req, res, next) => {
	const userId = req.userId;
	const videoId = req.videoId;
	const watchlater = new WatchLater({ userId, videoIds: [ videoId ] });

	await watchlater.save();
	res.json({ success: true, watchLater: watchlater });
};

module.exports = {
	findWatchLater,
	updateWatchLater,
	addNewWatchLater
};
