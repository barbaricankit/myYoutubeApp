import {
  filterDisLikedVideo,
  filterHistoryVideo,
  filterLikedVideo,
  findDisLikeVideo,
  findLikedVideo,
  filterWatchlaterVideo,
  findPlayListVideo,
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
          ...state.history.filter((video) => video.id !== action.value.id),
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
        videolist: state.videolist.map((video) =>
          video.id === action.value.id
            ? { ...video, watchlater: !video.watchlater }
            : video
        ),
      };
    case "PLAYLIST_OPTIONS":
      return { ...state, showPlayListOptions: !state.showPlayListOptions };
    case "ADD_TO_WATCH_LATER":
      return {
        ...state,
        watchlater: action.value.addOrRemove
          ? [...state.watchlater, action.value.video]
          : filterWatchlaterVideo(state, action.value.video),
        videolist: state.videolist.map((video) =>
          video.id === action.value.video.id
            ? { ...video, watchlater: !video.watchlater }
            : video
        ),
        playVideo: {
          ...state.playVideo,
          watchlater: !state.playVideo?.watchlater,
        },
      };
    case "SELECTED_PLAYLIST":
      const playlist_name = action.value.playlistName;
      const video = action.value.video;
      return {
        ...state,
        playLists: {
          ...state.playLists,
          [playlist_name]: findPlayListVideo(state, playlist_name, video)
            ? state.playLists[playlist_name].filter(
                (playlistvideos) => playlistvideos.id !== video.id
              )
            : [...state.playLists[playlist_name], video],
        },
      };
    case "NEW_PLAYLIST_ADDED":
      return {
        ...state,
        playLists: {
          ...state.playLists,
          [action.value.playlistName]: [action.value.video],
        },
      };
    case "ADDED_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        videolist: action.value.videos,
        playVideo: action.value.videos.find(
          (video) => video.id === state.playVideo?.id
        ),
      };
    case "LIKED_VIDEO":
      return {
        ...state,
        videolist: state.videolist.map((video) =>
          video.id === action.video.id
            ? { ...video, liked: !video.liked, disliked: false }
            : video
        ),
        likedVideos: findLikedVideo(state, action.video)
          ? filterLikedVideo(state, action.video)
          : [
              ...state.likedVideos,
              { ...action.video, liked: true, disliked: false },
            ],
        dislikeVideos: findDisLikeVideo(state, action.video)
          ? filterDisLikedVideo(state, action.video)
          : state.dislikeVideos,
        watchlater: state.watchlater.map((watch_later_video) =>
          watch_later_video.id === action.video.id
            ? {
                ...watch_later_video,
                liked: !watch_later_video.liked,
                disliked: false,
              }
            : watch_later_video
        ),
        history: state.history.map((history_video) =>
          history_video.id === action.video.id
            ? {
                ...history_video,
                liked: !history_video.liked,
                disliked: false,
              }
            : history_video
        ),
      };
    case "DIS_LIKED_VIDEO":
      return {
        ...state,
        videolist: state.videolist.map((video) =>
          video.id === action.video.id
            ? { ...video, disliked: !video.disliked, liked: false }
            : video
        ),
        dislikeVideos: findDisLikeVideo(state, action.video)
          ? filterDisLikedVideo(state, action.video)
          : [
              ...state.dislikeVideos,
              { ...action.video, disliked: true, liked: false },
            ],
        likedVideos: findLikedVideo(state, action.video)
          ? filterLikedVideo(state, action.video)
          : state.likedVideos,
        watchlater: state.watchlater.map((watch_later_video) =>
          watch_later_video.id === action.video.id
            ? {
                ...watch_later_video,
                disliked: !watch_later_video.disliked,
                liked: false,
              }
            : watch_later_video
        ),

        history: state.history.map((history_video) =>
          history_video.id === action.video.id
            ? {
                ...history_video,
                disliked: !history_video.liked,
                liked: false,
              }
            : history_video
        ),
      };
    case "DELETE_LIKED_VIDEO":
      return {
        ...state,
        likedVideos: filterLikedVideo(state, action.value),
        videolist: state.videolist.map((video) =>
          video.id === action.value.id
            ? { ...video, liked: false, disliked: false }
            : video
        ),
      };
    case "DELETE_PLAYLIST":
      delete state.playLists[action.playlistName];

      return {
        ...state,
        playLists: { ...state.playLists },
        videolist: state.videolist.map((video) => ({
          ...video,
          playlists: video.playlists.filter(
            (playlist) => playlist !== action.playlistName
          ),
        })),
      };
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      const playlist_Name = action.value.playlistName;
      const remove_video = action.value.video;
      return {
        ...state,
        playLists: {
          ...state.playLists,
          [playlist_Name]: state.playLists[playlist_Name].filter(
            (playlistVideo) => playlistVideo.id !== remove_video.id
          ),
        },
        videolist: state.videolist.map((video) =>
          video.id === remove_video.id
            ? {
                ...video,
                playlists: video.playlists.filter(
                  (playlistname) => playlistname !== playlist_Name
                ),
              }
            : video
        ),
      };
    default:
      return state;
  }
};
