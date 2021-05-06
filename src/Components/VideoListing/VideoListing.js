import { NavLink } from "react-router-dom";
import { usePlaylist } from "../../context/video-context";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoCardDetails from "./VideoCardDetails";
import VideoImage from "./VideoImage";
import { usePlaylistModal } from "../../context/playlist-context";
import SaveVideo from "../VideoPage/SaveVideo";
import { useEffect } from "react";
import ShowToast from "../AddVideoToPlayList/ShowToast";
export const VideoListing = () => {
  const { dispatch, filteredVideos } = usePlaylist();
  const {
    modalState: { playlistModal, video },
    modalDispatch,
  } = usePlaylistModal();
  useEffect(() => {
    return () => {
      dispatch({ type: "INITIAL_STATE" });
      modalDispatch({ type: "CLOSE_MODAL" });
    };
  }, [dispatch, modalDispatch]);
  return (
    <div className='content'>
      <div className='cards'>
        {filteredVideos.map((video, index) => (
          <div className='video_link video' key={index}>
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
            <div
              onClick={() => {
                modalDispatch({ type: "OPEN_MODAL", video });
              }}>
              <button className='ellipsis-btn'>
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {playlistModal && <SaveVideo video={video} />}
      <ShowToast />
    </div>
  );
};
