import { usePlaylist } from "../../../context/video-context";
import CardImage from "../HorizontalCardImage";
import LikeButton from "../../Buttons/Like";
import DisLikeButton from "../../Buttons/DisLike";
import CommentButton from "../../Buttons/Comment";
import TrashButton from "../../Buttons/Trash";

const WatchLaterContent = () => {
  const {
    state: { watchlater },
    filteredVideos,
  } = usePlaylist();

  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>Watch Later</div>
      </div>

      {watchlater.map((id, index) => {
        const video = filteredVideos.find(({ _id }) => _id === id);
        return (
          <div key={index} className='card horizontal-card-with-text card-text'>
            <CardImage video={video} />
            <div className='horizontal-card-details'>
              <div className='card-text-title'>{video.title}</div>
              <div className='stats'>
                <LikeButton video={video} />
                <DisLikeButton video={video} />
                <CommentButton video={video} />
                <TrashButton
                  type={"REMOVE_VIDEO_FROM_WATCH_LATER"}
                  value={video._id}
                />
              </div>
            </div>
          </div>
        );
      })}
      {watchlater.length === 0 && (
        <div className='h4 empty-playlist'>Add Videos to watch later</div>
      )}
    </div>
  );
};
export default WatchLaterContent;
