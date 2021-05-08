import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylistModal } from "../../context/playlist-context";
import { usePlaylist } from "../../context/video-context";

const AddNewPlaylist = ({ video }) => {
  const {
    modalState: { newPlayListInput, newPlaylistName },
    modalDispatch,
    manageToast,
  } = usePlaylistModal();
  const { state, dispatch } = usePlaylist();
  const addVideoToPlayList = (video, playListName) =>
    state.videolist.map((vid) =>
      vid.id === video.id
        ? {
            ...vid,
            playlists:
              vid.playlists.find((playlist) => playListName === playlist) ===
              undefined
                ? [...vid.playlists, playListName]
                : vid.playlists.filter((playlist) => playlist !== playListName),
          }
        : vid
    );
  const isPlaylistCheckboxChecked = (playlist) =>
    video.playlists.find((playlst) => playlst === playlist) === undefined
      ? false
      : true;
  if (!newPlayListInput)
    return (
      <div
        className='playlist'
        onClick={() =>
          modalDispatch({
            type: "SHOW_HIDE_NEW_PLAYLIST_INPUT_FIELD",
            value: true,
          })
        }>
        <FontAwesomeIcon icon={faPlus} />
        <span className='playlist_name'>Create New Playlist</span>
      </div>
    );

  return (
    <>
      <div className='new_playlist'>
        <input
          className='textbox'
          type='text'
          placeholder='Add custom playlist'
          value={newPlaylistName}
          onChange={(e) =>
            modalDispatch({
              type: "SET_NEW_PLAYLIST_NAME",
              value: e.target.value,
            })
          }
        />
      </div>
      <div className='btn_create'>
        <button
          className='btn_add_new_playlist'
          disabled={newPlaylistName === "" ? true : false}
          onClick={() => {
            dispatch({
              type: "NEW_PLAYLIST_ADDED",
              value: { playlistName: newPlaylistName, video: video },
            });
            dispatch({
              type: "ADDED_VIDEO_TO_PLAYLIST",
              value: {
                videos: addVideoToPlayList(video, newPlaylistName),
                playlistname: newPlaylistName,
              },
            });
            dispatch({ type: "PLAYLIST_OPTIONS" });

            modalDispatch({
              type: "ADD_TO_PLAYLIST",
              value: {
                flag: !isPlaylistCheckboxChecked(newPlaylistName),
                playListName: newPlaylistName,
              },
            });
            modalDispatch({ type: "CLOSE_MODAL" });
            manageToast();
          }}>
          Create
        </button>
      </div>
    </>
  );
};

export default AddNewPlaylist;
