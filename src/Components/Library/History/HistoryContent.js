import { usePlaylist } from "../../../context/video-context";
import CardImage from "../HorizontalCardImage";
import LikeButton from "../../Buttons/Like";
import DisLikeButton from "../../Buttons/DisLike";
import CommentButton from "../../Buttons/Comment";
import TrashButton from "../../Buttons/Trash";
const HistoryContent = () => {
  const { state, filteredVideos } = usePlaylist();

  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>History</div>
      </div>
      {state.history.map((id, index) => {
        const video = filteredVideos?.find(({ _id }) => _id === id);
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
                  value={video._id}
                  type={"REMOVE_VIDEO_FROM_HISTORY"}
                />
              </div>
            </div>
          </div>
        );
      })}
      {state.history.length === 0 && (
        <div className='h4 empty-playlist'>There is no records</div>
      )}
    </div>
  );
};

export default HistoryContent;
