import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { callServer } from "../API/api_call";
import { useAuth } from "./auth-context";
import { useData } from "./database-context";
import { managePlaylistReducer } from "./video-reducer";
const PlayListContext = createContext();

export const PlayListProvider = ({ children }) => {
  const { videoList } = useData();
  const videos = Object.assign(videoList);
  const { authState } = useAuth();
  useEffect(() => {
    dispatch({ type: "SETVIDEOLIST", value: videos });
  }, [videos]);
  useEffect(() => {
    if (authState?.userId) {
      (async () => {
        const { data } = await callServer({
          url: `/${authState?.userId}/user`,
          type: "GET",
        });
        if (data) {
          const {
            userId,
            likedvideos: likedVideos,
            dislikedvideos: dislikedVideos,
            playlists: playLists,
            watchlater,
            historyvideos: historyVideos,
          } = data;
          const serverData = {
            userId,
            likedVideos,
            dislikedVideos,
            playLists,
            watchlater: watchlater.videoIds,
            historyVideos,
          };
          dispatch({ type: "UPDATE_INITIAL_STATE", value: serverData });
        }
      })();
    }
  }, [authState]);
  const [state, dispatch] = useReducer(managePlaylistReducer, {
    history: [],
    videolist: videos,
    playVideo: null,
    playLists: [],
    watchlater: [],
    likedVideos: [],
    dislikeVideos: [],
    showPlayListOptions: false,
    navPlaylistSelection: null,
    showNav: false,
    searchText: "",
    userInitials: null,
  });
  const navbar = useRef(null);

  const searchedVideos = (videos, searchText) => {
    return videos.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const filterCurrentVideo = (videos, video) => {
    return videos.filter((vid) => video !== vid.youtube_id);
  };
  let filteredVideos = searchedVideos(state.videolist, state.searchText);

  filteredVideos.forEach((video) => {
    const findvideo = state.likedVideos.find(
      (videoId) => video._id === videoId
    );
    if (findvideo) {
      video.liked = true;
    } else {
      video.liked = false;
    }
  });
  filteredVideos.forEach((video) => {
    const findvideo = state.dislikeVideos.find(
      (videoId) => video._id === videoId
    );
    if (findvideo) {
      video.disliked = true;
    } else {
      video.disliked = false;
    }
  });
  filteredVideos.forEach((video) => {
    const findvideo = state.watchlater.find((videoId) => video._id === videoId);
    if (findvideo) {
      video.watchlater = true;
    } else {
      video.watchlater = false;
    }
  });
  const current_play_video = filteredVideos.find(
    ({ youtube_id }) => youtube_id === state.playVideo
  );
  filteredVideos = filterCurrentVideo(filteredVideos, state.playVideo);

  return (
    <PlayListContext.Provider
      value={{ state, dispatch, navbar, filteredVideos, current_play_video }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);
