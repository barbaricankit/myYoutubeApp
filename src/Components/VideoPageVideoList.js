import { NavLink } from "react-router-dom";
import { usePlaylist } from "../video-context";
import VideoCardDetails from "./VideoCardDetails";
import VideoImage from "./VideoImage";
const VideoPageVideoList = () => {
  const { state, dispatch } = usePlaylist();

  return (
    <>
      <div className='cards'>
        {state.videolist.map((video) => (
          <NavLink
            to={`/video/${video.id}`}
            className='video_link'
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
