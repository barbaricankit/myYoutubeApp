import "../../App.css";
import { usePlaylist } from "../../context/video-context";
import { usePlaylistModal } from "../../context/playlist-context";

const AddToWatchLater = ({ video }) => {
  const { dispatch } = usePlaylist();
  const { modalDispatch, manageToast } = usePlaylistModal();

  return (
    <>
      <div
        className='playlist'
        onClick={() => {
          dispatch({
            type: "ADD_TO_WATCH_LATER",
            value: { addOrRemove: !video?.watchlater, video: video },
          });
          modalDispatch({ type: "ADD_TO_WATCH_LATER" });
          manageToast();
        }}>
        <input type='checkbox' checked={video?.watchlater} />
        <span className='playlist_name'>Watch Later</span>
      </div>
    </>
  );
};

export default AddToWatchLater;
