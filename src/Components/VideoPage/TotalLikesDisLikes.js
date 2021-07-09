import "../../App.css";
import LikeButton from "../Buttons/Like";
import DisLikeButton from "../Buttons/DisLike";
import CommentButton from "../Buttons/Comment";
import SaveButton from "../Buttons/Save";

const VideoStats = ({ video }) => {
  return (
    <div className='stats'>
      <LikeButton video={video} />
      <DisLikeButton video={video} />
      <CommentButton video={video} />
      <SaveButton />
    </div>
  );
};

export default VideoStats;
