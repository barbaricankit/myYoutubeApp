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
      case "SHOW_NAV":
        return { ...state, showNav: !state.showNav };
      case "SETVIDEOLIST":
        return { ...state, videolist: action.value };
      case "PLAYVIDEO":
        return { ...state, playVideo: { ...action.value } };
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
            watchlater: !state.playVideo.watchlater,
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
            (video) => video.id === state.playVideo.id
          ),
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
    showPlayListOptions: false,
    navPlaylistSelection: null,
    showNav: false,
  });
  const navbar = useRef(null);
  return (
    <PlayListContext.Provider value={{ state, dispatch, navbar }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);

//state.playLists[action.value.playlistName].filter(playlistvideos=>playlistvideos.id!==action.value.video.id)
//[...state.playLists[action.value.playlistName],action.value.video]
