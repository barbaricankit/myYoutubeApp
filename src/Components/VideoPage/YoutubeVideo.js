import "../../App.css";

import YouTube from "react-youtube";
import { usePlaylist } from "../../context/video-context";

const YoutubeVideo = ({ video, videoId }) => {
  const { dispatch } = usePlaylist();

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <YouTube
        className='current-video-img'
        videoId={videoId}
        onPlay={() => dispatch({ type: "ADD_VIDEO_TO_HISTORY", value: video })}
        opts={opts}
      />
    </>
  );
};

export default YoutubeVideo;
