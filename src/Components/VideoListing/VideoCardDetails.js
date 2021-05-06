import TotalVideoViews from "./TotalVideoViews";
import VideoUploadedDate from "./VideoUploadedDate";

const VideoCardDetails = ({ video }) => {
  return (
    <div className='video-card-detail'>
      <h4 className='card-text-title video-title'>{video.snippet.title}</h4>

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
