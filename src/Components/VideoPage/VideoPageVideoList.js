import { NavLink } from "react-router-dom";
import { usePlaylist } from "../../context/video-context";
import VideoCardDetails from "../VideoListing/VideoCardDetails";
import VideoImage from "../VideoListing/VideoImage";
const VideoPageVideoList = () => {
  const { dispatch, filteredVideos } = usePlaylist();

  return (
    <>
      <div className='cards'>
        {filteredVideos.map((video, index) => (
          <NavLink
            to={`/video/${video.youtube_id}`}
            className='video_link'
            key={index}
            onClick={() => {
              dispatch({ type: "PLAYVIDEO", value: video.youtube_id });
            }}>
            <div
              key={video._id}
              className='card horizontal-card-with-text card-text'>
              <VideoImage video={video} />

              <VideoCardDetails video={video} />
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default VideoPageVideoList;
