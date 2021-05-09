import { usePlaylist } from "../../../context/video-context";
import { Link } from "react-router-dom";
import LikeButton from "../../Buttons/Like";
import DisLikeButton from "../../Buttons/DisLike";
import CommentButton from "../../Buttons/Comment";
import TrashButton from "../../Buttons/Trash";
const LikedVideosContent = () => {
  const {
    state: { likedVideos },
  } = usePlaylist();
  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>Liked Videos</div>
      </div>

      {likedVideos.length > 0 &&
        likedVideos.map((video, index) => (
          <div key={index} className='card horizontal-card-with-text card-text'>
            <Link to={`/video/${video.id}`}>
              <img
                className='horizontal-card-img'
                src={video.snippet.thumbnails.medium.url}
                alt={video.title}
              />
            </Link>
            <div className='horizontal-card-details'>
              <h3 className='card-text-title'>{video.snippet.title}</h3>
              <div className='stats'>
                <LikeButton video={video} />
                <DisLikeButton video={video} />
                <CommentButton video={video} />
                <TrashButton value={video} type={"DELETE_LIKED_VIDEO"} />
              </div>
            </div>
          </div>
        ))}
      {likedVideos.length === 0 && (
        <div className='h4 empty-playlist'>
          You do not have any Liked Videos
        </div>
      )}
    </div>
  );
};
export default LikedVideosContent;
