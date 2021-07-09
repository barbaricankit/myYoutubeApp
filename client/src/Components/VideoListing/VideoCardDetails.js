import TotalVideoViews from "./TotalVideoViews";
import VideoUploadedDate from "./VideoUploadedDate";

const VideoCardDetails = ({ video }) => {
  return (
    <div className='video-card-detail'>
      <div className='card-text-title video-title'>{video.title}</div>

      <div className='current-video-details'>
        <div className='current-video-view-count'>
          <TotalVideoViews viewCount={video.statistics.viewCount} />
          <VideoUploadedDate uploadedDate={video.snippet.publishedAt} />
        </div>
      </div>
    </div>
  );
};

export default VideoCardDetails;
