import "../../App.css";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showView } from "../utils";
const CommentButton = ({ video }) => {
  return (
    <div className='stat'>
      <FontAwesomeIcon className='stat-icon' icon={faComment} />
      <span className='stat-count'>
        {showView({ count: video?.statistics.commentCount })}
      </span>
    </div>
  );
};

export default CommentButton;
