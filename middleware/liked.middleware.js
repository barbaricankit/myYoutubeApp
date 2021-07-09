const _ = require('lodash');
const updateLikedVideo = async (req, res, next) => {
	const user = req.user;
	const likedVideos = user.likedVideos;
	const { videoId } = req.body;

	const findVideo = likedVideos.find((id) => id == videoId);
	if (findVideo) {
		likedVideos.forEach((id, index) => {
			if (videoId == id) {
				likedVideos.splice(index, 1);
			}
		});
	} else {
		likedVideos.push(videoId);
	}
	await user.save();
	res.json({ success: true, likedVideos });
};
const updateDisLikedVideo = async (req, res, next) => {
	const user = req.user;
	const dislikedVideos = user.dislikedVideos;
	const { videoId } = req.body;

	const findVideo = dislikedVideos.find((id) => id == videoId);
	if (findVideo) {
		dislikedVideos.forEach((id, index) => {
			if (videoId == id) {
				dislikedVideos.splice(index, 1);
			}
		});
	} else {
		dislikedVideos.push(videoId);
	}
	await user.save();
	res.json({ success: true, dislikedVideos });
};
const updateHistoryVideo = async (req, res, next) => {
	const user = req.user;
	const historyVideos = user.historyVideos;
	const { videoId } = req.body;

	const findVideo = historyVideos.find((id) => id == videoId);
	if (findVideo) {
		historyVideos.forEach((id, index) => {
			if (videoId == id) {
				historyVideos.splice(index, 1);
			}
		});
	} else {
		historyVideos.unshift(videoId);
	}
	await user.save();
	res.json({ success: true, historyVideos });
};
module.exports = {
	updateLikedVideo,
	updateDisLikedVideo,
	updateHistoryVideo
};
