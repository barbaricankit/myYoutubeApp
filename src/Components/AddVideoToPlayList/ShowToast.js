import { usePlaylistModal } from "../../context/playlist-context";

const ShowToast = () => {
  const {
    modalState: { showToast, playlistSelected, addtoPlaylist },
  } = usePlaylistModal();

  return (
    <>
      {addtoPlaylist ? (
        <div className={`toast-desc-1 ${showToast}`}>
          Added to {playlistSelected}
        </div>
      ) : (
        <div className={`toast-desc-1 ${showToast}`}>
          Removed from {playlistSelected}
        </div>
      )}
    </>
  );
};

export default ShowToast;
