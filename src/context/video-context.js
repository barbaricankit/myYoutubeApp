import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useData } from "./database-context";
const PlayListContext = createContext();

export const PlayListProvider = ({ children }) => {
  const { videoList } = useData();
  const videos = Object.assign(videoList);
  useEffect(() => {
    dispatch({ type: "SETVIDEOLIST", value: videos });
  }, [videos]);
  const managePlaylistReducer = (state, action) => {
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
          history: state.history.filter(
            (video) => video.id !== action.value.id
          ),
        };
      case "REMOVE_VIDEO_FROM_WATCH_LATER":
        return {
          ...state,
          watchlater: state.watchlater.filter(
            (video) => video.id !== action.value.id
          ),
        };
      case "PLAYLIST_OPTIONS":
        return { ...state, showPlayListOptions: !state.showPlayListOptions };
      case "ADD_TO_WATCH_LATER":
        return {
          ...state,
          watchlater: action.value.addOrRemove
            ? [...state.watchlater, action.value.video]
            : state.watchlater.filter(
                (video) => video.id !== action.value.video.id
              ),
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
        return {
          ...state,
          playLists: {
            ...state.playLists,
            [action.value.playlistName]:
              state.playLists[action.value.playlistName].findIndex(
                (video) => video.id === action.value.video.id
              ) !== -1
                ? state.playLists[action.value.playlistName].filter(
                    (playlistvideos) =>
                      playlistvideos.id !== action.value.video.id
                  )
                : [
                    ...state.playLists[action.value.playlistName],
                    action.value.video,
                  ],
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
          likedVideos: state.likedVideos.find(
            (video) => video.id === action.video.id
          )
            ? state.likedVideos.filter((video) => video.id !== action.video.id)
            : [...state.likedVideos, action.video],
          dislikeVideos: state.dislikeVideos.find(
            (video) => video.id === action.video.id
          )
            ? state.likedVideos.filter((video) => video.id !== action.video.id)
            : state.dislikeVideos,
        };
      case "DIS_LIKED_VIDEO":
        return {
          ...state,
          videolist: state.videolist.map((video) =>
            video.id === action.video.id
              ? { ...video, disliked: !video.disliked, liked: false }
              : video
          ),
          dislikeVideos: state.dislikeVideos.find(
            (video) => video.id === action.video.id
          )
            ? state.dislikeVideos.filter(
                (video) => video.id !== action.video.id
              )
            : [...state.dislikeVideos, action.video],
          likedVideos: state.likedVideos.find(
            (video) => video.id === action.video.id
          )
            ? state.likedVideos.filter((video) => video.id !== action.video.id)
            : state.likedVideos,
        };
      case "DELETE_LIKED_VIDEO":
        return {
          ...state,
          likedVideos: state.likedVideos.filter(
            (video) => video.id !== action.value.id
          ),
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
        return {
          ...state,
          playLists: {
            ...state.playLists,
            [action.value.playlistName]: state.playLists[
              action.value.playlistName
            ].filter(
              (playlistVideo) => playlistVideo.id !== action.value.video.id
            ),
          },
          videolist: state.videolist.map((video) =>
            video.id === action.value.video.id
              ? {
                  ...video,
                  playlists: video.playlists.filter(
                    (playlistname) => playlistname !== action.value.playlistName
                  ),
                }
              : video
          ),
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(managePlaylistReducer, {
    history: [],
    videolist: videos,
    playVideo: null,
    playLists: { Movies: [], Sports: [] },
    watchlater: [],
    likedVideos: [],
    dislikeVideos: [],
    showPlayListOptions: false,
    navPlaylistSelection: null,
    showNav: false,
    searchText: "",
  });
  const navbar = useRef(null);
  const searchedVideos = (videos, searchText) => {
    return videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const filterCurrentVideo = (videos, video) => {
    return videos.filter((vid) => video?.id !== vid.id);
  };
  const filteredVideos = filterCurrentVideo(
    searchedVideos(state.videolist, state.searchText),
    state.playVideo
  );
  return (
    <PlayListContext.Provider
      value={{ state, dispatch, navbar, filteredVideos }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);
