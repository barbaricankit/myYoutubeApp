import { createContext, useContext, useReducer } from "react";
import { manageModalState } from "./playlist-reducer";

const PlayListModalContext = createContext();

const PlayListModalProvider = ({ children }) => {
  const [modalState, modalDispatch] = useReducer(manageModalState, {
    video: "",
    playlistModal: false,
    newPlayListInput: false,
    newPlaylistName: "",
    addtoPlaylist: false,
    addToWatchLater: false,
    showToast: "",
    playlistSelected: "",
    deletePlayListModal: false,
  });
  const manageToast = () => {
    modalDispatch({ type: "SHOW_HIDE_TOAST", value: "show" });
    setTimeout(() => {
      modalDispatch({ type: "SHOW_HIDE_TOAST", value: "" });
    }, 2000);
  };
  return (
    <PlayListModalContext.Provider
      value={{ modalState, modalDispatch, manageToast }}>
      {children}
    </PlayListModalContext.Provider>
  );
};
export default PlayListModalProvider;
export const usePlaylistModal = () => useContext(PlayListModalContext);
