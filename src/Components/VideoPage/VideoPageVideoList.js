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
            to={`/video/${video.id}`}
            className='video_link'
            key={index}
            onClick={() => {
              dispatch({ type: "PLAYVIDEO", value: video });
            }}>
            <div
              key={video.id}
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
