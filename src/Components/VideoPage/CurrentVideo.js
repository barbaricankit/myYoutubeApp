import "../../App.css";
import YoutubeVideo from "./YoutubeVideo";
import TotalVideoViews from "../VideoListing/TotalVideoViews";
import VideoLikesDisLikesComments from "./TotalLikesDisLikes";
import VideoUploadedDate from "../VideoListing/VideoUploadedDate";
import SaveVideo from "./SaveVideo";
import { usePlaylistModal } from "../../context/playlist-context";
import ShowToast from "../AddVideoToPlayList/ShowToast";
const CurrentVideo = ({ video, videoId }) => {
  const {
    modalState: { playlistModal },
  } = usePlaylistModal();
 
  return (
    <div className='video-height current-video'>
      <div className='youtube'>
        <span className='youtube-video'>
          <YoutubeVideo id={video?._id} videoId={videoId} />
        </span>
        <div className='video-title'>{video?.title}</div>
        <div className='current-video-details'>
          <div className='current-video-view-count'>
            <TotalVideoViews viewCount={video?.statistics.viewCount} />
            <VideoUploadedDate uploadedDate={video?.snippet.publishedAt} />
          </div>
          <VideoLikesDisLikesComments video={video} />
        </div>
        <hr />
        <div>
          {playlistModal && <SaveVideo video={video} />}
          <ShowToast />
        </div>
      </div>
    </div>
  );
};

export default CurrentVideo;
