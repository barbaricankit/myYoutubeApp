export const findLikedVideo = (state, id) => {
  return state.likedVideos.find((like_video_id) => like_video_id === id);
};
export const findDisLikeVideo = (state, id) => {
  return state.dislikeVideos.find(
    (dislike_video_id) => dislike_video_id === id
  );
};
export const filterLikedVideo = (state, id) => {
  return state.likedVideos.filter((like_video_id) => like_video_id !== id);
};
export const filterDisLikedVideo = (state, id) => {
  return state.likedVideos.filter(
    (dislike_video_id) => dislike_video_id !== id
  );
};
export const filterHistoryVideo = (state, id) => {
  return state.history.filter((history_video_id) => history_video_id !== id);
};
export const filterWatchlaterVideo = (state, id) => {
  return state.watchlater.filter(
    (watchlater_video_id) => watchlater_video_id !== id
  );
};
export const findPlayListVideo = (state, playlistName, video) => {
  return state.playLists[playlistName].find(
    (playlist_video) => playlist_video.id === video.id
  );
};
export const updateVideoIds = (playlist, id) => {
  return playlist.videoIds.find((video_id) => id === video_id)
    ? playlist.videoIds.filter((video_id) => id !== video_id)
    : [...playlist.videoIds, id];
};
export const deleteVideoFromPlayList = (videoIds, id) =>
  videoIds.filter((video_id) => id !== video_id);
