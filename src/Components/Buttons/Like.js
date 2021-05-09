import "../../App.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylist } from "../../context/video-context";
import { showView } from "../utils";
const LikeButton = ({ video }) => {
  const { dispatch } = usePlaylist();

  return (
    <div
      className='stat'
      onClick={() => dispatch({ type: "LIKED_VIDEO", video })}>
      <FontAwesomeIcon
        className={`stat-icon ${video.liked ? "selected-stat-icon" : ""}`}
        icon={faThumbsUp}
      />
      <span className='stat-count'>
        {showView({ count: video.statistics.likeCount })}
      </span>
    </div>
  );
};

export default LikeButton;
