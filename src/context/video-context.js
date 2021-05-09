import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useData } from "./database-context";
import { managePlaylistReducer } from "./video-reducer";
const PlayListContext = createContext();

export const PlayListProvider = ({ children }) => {
  const { videoList } = useData();
  const videos = Object.assign(videoList);
  useEffect(() => {
    dispatch({ type: "SETVIDEOLIST", value: videos });
  }, [videos]);

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
