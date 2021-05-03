import { NavLink } from "react-router-dom";
import { usePlaylist } from "../video-context";

import VideoCardDetails from "./VideoCardDetails";
import VideoImage from "./VideoImage";
export const VideoListing = () => {
  const { state, dispatch } = usePlaylist();

  return (
    <div className='content'>
      <div className='cards'>
        {state.videolist.map((video) => (
          <NavLink
            to={`/video/${video.id}`}
            className='video_link'
            onClick={() => {
              dispatch({ type: "PLAYVIDEO", value: video });
            }}>
            <div key={video.id} className='card card-with-text card-text'>
              <VideoImage video={video} />

              <VideoCardDetails video={video} />
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
