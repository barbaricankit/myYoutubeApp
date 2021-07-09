import { callServer } from "../../API/api_call";
import { useAuth } from "../../context/auth-context";
import { usePlaylistModal } from "../../context/playlist-context";
import { usePlaylist } from "../../context/video-context";

const NewPlayListInputField = ({ video }) => {
  const {
    modalDispatch,
    modalState: { newPlaylistName },
    manageToast,
  } = usePlaylistModal();
  const { dispatch } = usePlaylist();
  const {
    authState: { userId },
  } = useAuth();

  const managePlayList = async ({ newPlaylistName }) => {
    const { data } = await callServer({
      url: `/${userId}/${newPlaylistName}`,
      type: "POST",
      body: { videoId: video._id },
    });
    if (data.success) {
      dispatch({
        type: "NEW_PLAYLIST_ADDED",
        value: { playlistName: newPlaylistName, video_id: video._id },
      });

      modalDispatch({
        type: "ADD_TO_PLAYLIST",
        value: {
          flag: true,
          playListName: newPlaylistName,
        },
      });
      modalDispatch({ type: "CLOSE_MODAL" });
      manageToast();
    } else {
      console.log("Something went wrong! Couldn't add video to the playlist");
    }
  };
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
          onClick={() => managePlayList({ newPlaylistName })}>
          Create
        </button>
      </div>
    </>
  );
};
export default NewPlayListInputField;
