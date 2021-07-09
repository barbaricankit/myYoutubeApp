import "../../App.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylist } from "../../context/video-context";
import { showView } from "../utils";
import { callServer } from "../../API/api_call";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ video }) => {
  const { dispatch } = usePlaylist();
  const navigate = useNavigate();
  const {
    authState: { login, userId },
  } = useAuth();

  const likeVideoHandler = async () => {
    if (login) {
      const { data } = await callServer({
        url: `${userId}/like`,
        type: "POST",
        body: { videoId: video?._id },
      });
      if (data.success) {
        dispatch({ type: "LIKED_VIDEO", video_id: video?._id });
      } else {
        console.log("Something Went wrong, cannot liked the video");
      }
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className='stat' onClick={() => likeVideoHandler()}>
      <FontAwesomeIcon
        className={`stat-icon ${video?.liked ? "selected-stat-icon" : ""}`}
        icon={faThumbsUp}
      />
      <span className='stat-count'>
        {showView({ count: video?.statistics.likeCount })}
      </span>
    </div>
  );
};

export default LikeButton;
