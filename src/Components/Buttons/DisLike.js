import "../../App.css";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylist } from "../../context/video-context";
import { showView } from "../utils";
const DisLikeButton = ({ video }) => {
  const { dispatch } = usePlaylist();

  return (
    <div
      className='stat'
      onClick={() => dispatch({ type: "DIS_LIKED_VIDEO", video })}>
      <FontAwesomeIcon
        className={`stat-icon ${video.disliked ? "selected-stat-icon" : ""}`}
        icon={faThumbsDown}
      />
      <span className='stat-count'>
        {showView({ count: video.statistics.dislikeCount })}
      </span>
    </div>
  );
};

export default DisLikeButton;
