import { useState } from "react";
import { usePlaylist } from "../video-context";

const RemovePlaylistModal = ({ playListName, video }) => {
  const { dispatch } = usePlaylist();
  const [setShowModal] = useState(false);
  return (
    <div className='modal' style={{ position: "fixed", zIndex: "1" }}>
      <div class='modal-header'>
        <h3 className='modal-title'>Remove Video from playlist </h3>
        <button className='close-modal' onClick={() => setShowModal(false)}>
          x
        </button>
      </div>
      <p className='modal-txt'>
        Are you sure you want to delete the video from {playListName} playlist?
      </p>
      <div className='btn-modal'>
        <button className='btn-text' onClick={() => setShowModal(false)}>
          <span className='h6'>Cancel</span>
        </button>
        <button
          className='btn-primary'
          onClick={() => {
            setShowModal(false);
            dispatch({
              type: "REMOVE_VIDEO_FROM_PLAYLIST",
              value: { playlistName: playListName, video: video },
            });
          }}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RemovePlaylistModal;
