import {
  filterDisLikedVideo,
  filterHistoryVideo,
  filterLikedVideo,
  findDisLikeVideo,
  findLikedVideo,
  filterWatchlaterVideo,
  updateVideoIds,
  deleteVideoFromPlayList,
} from "./util_functions";

export const managePlaylistReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_STATE":
      return {
        ...state,
        playVideo: null,
        showPlayListOptions: false,
        navPlaylistSelection: null,
        showNav: false,
        searchText: "",
        playLists: [],
        watchlater: [],
        likedVideos: [],
        dislikedVideos: [],
        history: [],
      };
    case "UPDATE_INITIAL_STATE":
      const {
        likedVideos,
        dislikedVideos,
        playLists,
        watchlater,
        historyVideos,
      } = action.value;
      return {
        ...state,
        playLists: playLists,
        watchlater: watchlater?watchlater:[],
        likedVideos: likedVideos,
        dislikeVideos: dislikedVideos,
        history: historyVideos,
      };
    case "REMOVE_PLAY_VIDEO":
      return { ...state, playVideo: null };
    case "LOAD_PLAYLIST_DATA":
      return {
        ...state,
        playLists: [action.value],
      };
    case "LOAD_LIKED_VIDEOS_DATA":
      return {
        ...state,
        likedVideos: action.value,
      };
    case "SHOW_NAV":
      return { ...state, showNav: !state.showNav };
    case "CLOSE_NAV":
      return { ...state, showNav: false };
    case "SETVIDEOLIST":
      return { ...state, videolist: action.value };
    case "PLAYVIDEO":
      return { ...state, playVideo: action.value };
    case "SEARCH_ACTION":
      return { ...state, searchText: action.value };
    case "ADD_VIDEO_TO_HISTORY":
      return {
        ...state,
        history: [
          action.value,
          ...state.history.filter((id) => id !== action.value),
        ],
      };
    case "REMOVE_VIDEO_FROM_HISTORY":
      return {
        ...state,
        history: filterHistoryVideo(state, action.value),
      };
    case "REMOVE_VIDEO_FROM_WATCH_LATER":
      return {
        ...state,
        watchlater: filterWatchlaterVideo(state, action.value),
      };

    case "ADD_TO_WATCH_LATER":
      return {
        ...state,
        watchlater: action.value.addOrRemove
          ? [...state.watchlater, action.value.video_id]
          : filterWatchlaterVideo(state, action.value.video_id),
      };
    case "SELECTED_PLAYLIST":
      const { playlistName: playlist_name, video_id } = action.value;
      const current_playlist = state.playLists.find(
        ({ playlistName }) => playlistName === playlist_name
      );

      return {
        ...state,
        playLists: state.playLists.map(({ playlistName, videoIds }) => {
          if (playlistName === playlist_name) {
            return {
              playlistName: playlist_name,
              videoIds: updateVideoIds(current_playlist, video_id),
            };
          }
          return { playlistName, videoIds };
        }),
      };
    case "NEW_PLAYLIST_ADDED":
      return {
        ...state,
        playLists: [
          ...state.playLists,
          {
            playlistName: action.value.playlistName,
            videoIds: [action.value.video_id],
          },
        ],
      };
    case "LIKED_VIDEO":
      return {
        ...state,

        likedVideos: findLikedVideo(state, action.video_id)
          ? filterLikedVideo(state, action.video_id)
          : [...state.likedVideos, action.video_id],

        dislikeVideos: findDisLikeVideo(state, action.video_id)
          ? filterDisLikedVideo(state, action.video_id)
          : state.dislikeVideos,
      };
    case "DIS_LIKED_VIDEO":
      return {
        ...state,
        dislikeVideos: findDisLikeVideo(state, action.video_id)
          ? filterDisLikedVideo(state, action.video_id)
          : [...state.dislikeVideos, action.video_id],
        likedVideos: findLikedVideo(state, action.video_id)
          ? filterLikedVideo(state, action.video_id)
          : state.likedVideos,
      };
    case "DELETE_LIKED_VIDEO":
      return {
        ...state,
        likedVideos: filterLikedVideo(state, action.value),
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.filter(
          ({ playlistName }) => playlistName !== action.playlistName
        ),
      };
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      const { playlistName: playlist_Name, video_id: id } = action.value;

      return {
        ...state,
        playLists: state.playLists.map(({ playlistName, videoIds }) =>
          playlistName === playlist_Name
            ? { playlistName, videoIds: deleteVideoFromPlayList(videoIds, id) }
            : { playlistName, videoIds }
        ),
      };
    default:
      return state;
  }
};
