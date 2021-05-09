export const findLikedVideo = (state, video) => {
  return state.likedVideos.find((like_video) => like_video.id === video.id);
};
export const findDisLikeVideo = (state, video) => {
  return state.dislikeVideos.find(
    (dislike_video) => dislike_video.id === video.id
  );
};
export const filterLikedVideo = (state, video) => {
  return state.likedVideos.filter((like_video) => like_video.id !== video.id);
};
export const filterDisLikedVideo = (state, video) => {
  return state.likedVideos.filter(
    (dislike_video) => dislike_video.id !== video.id
  );
};
export const filterHistoryVideo = (state, video) => {
  return state.history.filter((history_video) => history_video.id !== video.id);
};
export const filterWatchlaterVideo = (state, video) => {
  console.log(state, video);
  return state.watchlater.filter(
    (watchlater_video) => watchlater_video.id !== video.id
  );
};
export const findPlayListVideo = (state, playlistName, video) => {
  return state.playLists[playlistName].find(
    (playlist_video) => playlist_video.id === video.id
  );
};
