export const manageModalState = (state, action) => {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        playlistModal: false,
        newPlayListInput: false,
        newPlaylistName: "",
      };
    case "OPEN_MODAL":
      return {
        ...state,
        playlistModal: true,
        video: action.video,
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        addtoPlaylist: action.value.flag,
        playlistSelected: action.value.playListName,
        video: state.video && {
          ...state.video,
          playlists: state.video?.playlists.find(
            (playlistName) => playlistName === action.value.playListName
          )
            ? state.video?.playlists?.filter(
                (playlistName) => playlistName !== action.value.playListName
              )
            : [...state.video?.playlists, action.value.playListName],
        },
      };
    case "SHOW_HIDE_NEW_PLAYLIST_INPUT_FIELD":
      return {
        ...state,
        newPlayListInput: true,
      };
    case "SET_NEW_PLAYLIST_NAME":
      return {
        ...state,
        newPlaylistName: action.value,
      };
    case "ADD_TO_WATCH_LATER":
      return {
        ...state,
        addToWatchLater: !state.addToWatchLater,
        addtoPlaylist: !state.addToWatchLater,
        playlistSelected: "Watch Later",
        video: state.video && {
          ...state.video,
          watchlater: !state.video?.watchlater,
        },
      };
    case "SHOW_HIDE_TOAST":
      return {
        ...state,
        showToast: action.value,
      };
    case "SHOW_HIDE_DELETE_PLAYLIST_MODAL":
      return {
        ...state,
        deletePlayListModal: action.value,
      };
    default:
      return state;
  }
};
