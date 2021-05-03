import "../App.css";
import {
  faComment,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { usePlaylist } from "../video-context";
import PlaylistModal from "./PlaylistModal";
import VideoPageVideoList from "./VideoPageVideoList";

const VideoPage = () => {
  const { state, dispatch } = usePlaylist();
  const [showToast, setShowToast] = useState("toast-desc-1");
  const [addToWatchLater, setAddToWatchLater] = useState(false);
  const { videoId } = useParams();
  const video = state.videolist.find((video) => video.id === videoId);
  console.log(state.videolist, videoId);
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const manageToast = () => {
    setShowToast((showToast) => showToast + " show");
    setTimeout(() => {
      setShowToast((showToast) => showToast.replace("show", ""));
    }, 5000);
  };
  return (
    <>
      <div style={{ marginTop: "4rem" }} className='video-page'>
        <div className='video-height current-video'>
          <div className='youtube'>
            <YouTube
              className='current-video-img'
              videoId={video.id}
              onPlay={() =>
                dispatch({ type: "ADD_VIDEO_TO_HISTORY", value: video })
              }
              opts={opts}
            />
            <h1>{video.snippet.title}</h1>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  {Math.round(video.statistics.viewCount / 1000)}K views |{" "}
                </div>
                <div>
                  {" "}
                  Uploaded on April {video.snippet.publishedAt.substring(
                    0,
                    4
                  )}{" "}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  {" "}
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    size='1x'
                    style={{ color: "blue" }}
                  />{" "}
                  {video.statistics.likeCount}{" "}
                </div>
                <div>
                  <FontAwesomeIcon icon={faThumbsDown} />{" "}
                  {video.statistics.dislikeCount}{" "}
                </div>
                <div>
                  <FontAwesomeIcon icon={faComment} />{" "}
                  {video.statistics.commentCount}{" "}
                </div>
              </div>
            </div>
            <div>
              <button
                className='btn-primary btn-bg-color'
                onClick={() => dispatch({ type: "PLAYLIST_OPTIONS" })}>
                Add to Playlist
              </button>
              <button
                className='btn-primary btn-bg-color'
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_WATCH_LATER",
                    value: { addOrRemove: !addToWatchLater, video: video },
                  });
                  manageToast();
                  setAddToWatchLater(!addToWatchLater);
                }}>
                {video.watchlater
                  ? "Added to Watch Later"
                  : "Add to Watch Later"}
              </button>
              <PlaylistModal />
            </div>

            {addToWatchLater && (
              <div className={showToast}>Added to Watch Later</div>
            )}
            {!addToWatchLater && (
              <div className={showToast}>Removed from Watch Later</div>
            )}
          </div>
        </div>
        <div className='other-videos'>
          <VideoPageVideoList />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
