import "../../App.css";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylist } from "../../context/video-context";
import { showView } from "../utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { callServer } from "../../API/api_call";
const DisLikeButton = ({ video }) => {
  const { dispatch } = usePlaylist();
  const navigate = useNavigate();
  const {
    authState: { login, userId },
  } = useAuth();
  const disLikeVideoHandler = async () => {
    if (login) {
      const { data } = await callServer({
        url: `${userId}/like`,
        type: "POST",
        body: { videoId: video._id },
      });
      if (data.success) {
        dispatch({ type: "DIS_LIKED_VIDEO", video_id: video._id });
      } else {
        console.log("Something Went wrong, cannot disliked the video");
      }
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className='stat' onClick={() => disLikeVideoHandler()}>
      <FontAwesomeIcon
        className={`stat-icon ${video?.disliked ? "selected-stat-icon" : ""}`}
        icon={faThumbsDown}
      />
      <span className='stat-count'>
        {showView({ count: video?.statistics.dislikeCount })}
      </span>
    </div>
  );
};

export default DisLikeButton;
