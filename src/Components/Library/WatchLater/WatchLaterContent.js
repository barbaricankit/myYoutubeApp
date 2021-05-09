import { usePlaylist } from "../../../context/video-context";
import CardImage from "../HorizontalCardImage";
import LikeButton from "../../Buttons/Like";
import DisLikeButton from "../../Buttons/DisLike";
import CommentButton from "../../Buttons/Comment";
import TrashButton from "../../Buttons/Trash";

const WatchLaterContent = () => {
  const { state } = usePlaylist();

  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>Watch Later</div>
      </div>

      {state.watchlater.length > 0 &&
        state.watchlater.map((video, index) => (
          <div key={index} className='card horizontal-card-with-text card-text'>
            <CardImage video={video} />
            <div className='horizontal-card-details'>
              <h3 className='card-text-title'>{video.snippet.title}</h3>
              <div className='stats'>
                <LikeButton video={video} />
                <DisLikeButton video={video} />
                <CommentButton video={video} />
                <TrashButton
                  type={"REMOVE_VIDEO_FROM_WATCH_LATER"}
                  value={video}
                />
              </div>
            </div>
          </div>
        ))}
      {state.watchlater.length === 0 && (
        <div className='h4 empty-playlist'>Add Videos to watch later</div>
      )}
    </div>
  );
};
export default WatchLaterContent;
