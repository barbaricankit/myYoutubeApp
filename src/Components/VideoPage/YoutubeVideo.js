import "../../App.css";

import YouTube from "react-youtube";
import { usePlaylist } from "../../context/video-context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { callServer } from "../../API/api_call";

const YoutubeVideo = ({ id, videoId }) => {
  const { dispatch } = usePlaylist();
  const navigate = useNavigate();
  const {
    authState: { login, userId },
  } = useAuth();
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const historyVideoHandler = async () => {
    if (login) {
      const { data } = await callServer({
        url: `${userId}/history`,
        type: "POST",
        body: { videoId: id },
      });
      if (data.success) {
        dispatch({ type: "ADD_VIDEO_TO_HISTORY", value: id });
      } else {
        console.log("Something Went wrong, cannot add the video to history");
      }
    } else {
      navigate("/signin");
    }
  };
  return (
    <>
      <YouTube
        className='current-video-img'
        videoId={videoId}
        onPlay={() => historyVideoHandler()}
        opts={opts}
      />
    </>
  );
};

export default YoutubeVideo;
