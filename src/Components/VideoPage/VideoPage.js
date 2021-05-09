import "../../App.css";

import { useParams } from "react-router-dom";
import { usePlaylist } from "../../context/video-context";
import VideoPageVideoList from "./VideoPageVideoList";
import CurrentVideo from "./CurrentVideo";
import YoutubeVideo from "./YoutubeVideo";
import { useEffect } from "react";
import { usePlaylistModal } from "../../context/playlist-context";
const VideoPage = () => {
  const { state, dispatch } = usePlaylist();
  const { modalDispatch } = usePlaylistModal();

  const { videoId } = useParams();
  const video = state.videolist.find((video) => video.id === videoId);
  useEffect(() => {
    return () => {
      dispatch({ type: "INITIAL_STATE" });
      modalDispatch({ type: "CLOSE_MODAL" });
    };
  }, [dispatch, modalDispatch]);

  return (
    <>
      <div className='video-page'>
        <span className='youtube-video-sm-screen'>
          <YoutubeVideo video={video} videoId={videoId} />
        </span>
        <CurrentVideo video={video} videoId={videoId} />
        <div className='other-videos'>
          <VideoPageVideoList />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
