import { useNavigate, useParams } from "react-router-dom";
import { usePlaylistModal } from "../../../context/playlist-context";
import { usePlaylist } from "../../../context/video-context";

const DeletePlayListModal = () => {
  const { modalDispatch } = usePlaylistModal();
  const { dispatch } = usePlaylist();
  const { playlistname } = useParams();
  const navigate = useNavigate();
  return (
    <div className='modal modal-size modal-color'>
      <div className='modal-header'>
        <h3 className='modal-title'>Delete Playlist </h3>
        <button
          className='btn-text btn-color close-modal'
          onClick={() =>
            modalDispatch({
              type: "SHOW_HIDE_DELETE_PLAYLIST_MODAL",
              value: false,
            })
          }>
          x
        </button>
      </div>
      <p className='modal-txt white-bg'>
        Are you sure you want to delete the {playlistname} playlist?
      </p>
      <div className='btn-modal'>
        <button
          className='btn-text btn-color'
          onClick={() =>
            modalDispatch({
              type: "SHOW_HIDE_DELETE_PLAYLIST_MODAL",
              value: false,
            })
          }>
          <span className='h6'>Cancel</span>
        </button>
        <button
          className='btn-primary btn-bg-color'
          onClick={() => {
            modalDispatch({
              type: "SHOW_HIDE_DELETE_PLAYLIST_MODAL",
              value: false,
            });
            dispatch({ type: "DELETE_PLAYLIST", playlistName: playlistname });
            navigate("/");
          }}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default DeletePlayListModal;
