import "../../App.css";
import { usePlaylist } from "../../context/video-context";
import { usePlaylistModal } from "../../context/playlist-context";
import { useAuth } from "../../context/auth-context";
import { callServer } from "../../API/api_call";
import { useNavigate } from "react-router-dom";

const AddToWatchLater = ({ id, watchlater }) => {
  const { dispatch } = usePlaylist();

  const { modalDispatch, manageToast } = usePlaylistModal();
  const {
    authState: { userId, login },
  } = useAuth();
  const navigate = useNavigate();
  const manageWatchLater = async () => {
    const { data } = await callServer({
      url: `/${userId}/watchlater`,
      type: "POST",
      body: { videoId: id },
    });
    if (data.success) {
      dispatch({
        type: "ADD_TO_WATCH_LATER",
        value: { addOrRemove: !watchlater, video_id: id },
      });
      modalDispatch({ type: "ADD_TO_WATCH_LATER" });
      manageToast();
    } else {
      console.log("Something went wrong! Couldn't add video to watchlater");
    }
  };
  return (
    <>
      <div
        className='playlist'
        onClick={() => (login ? manageWatchLater() : navigate("/signin"))}>
        <input type='checkbox' checked={watchlater} />
        <span className='playlist_name'>Watch Later</span>
      </div>
    </>
  );
};

export default AddToWatchLater;
