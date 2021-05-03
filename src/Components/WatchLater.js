import { usePlaylist } from "../video-context";
import {
  faTrash,
  faThumbsUp,
  faThumbsDown,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
export const WatchLater = () => {
  const { state, dispatch } = usePlaylist();
  const [showModal, setShowModal] = useState(false);
  const RemovePlaylistModal = (video) => (
    <div className='modal' style={{ position: "fixed", zIndex: "1" }}>
      <div class='modal-header'>
        <h3 className='modal-title'>Remove Video from playlist </h3>
        <button className='close-modal' onClick={() => setShowModal(false)}>
          x
        </button>
      </div>
      <p className='modal-txt'>
        Are you sure you want to delete the video from the history?
      </p>
      <div className='btn-modal'>
        <button className='btn-text' onClick={() => setShowModal(false)}>
          <span className='h6'>Cancel</span>
        </button>
        <button
          className='btn-primary'
          onClick={() => {
            setShowModal(false);
            console.log("Line no. 21 " + video);
            dispatch({ type: "REMOVE_VIDEO_FROM_WATCH_LATER", value: video });
          }}>
          Remove
        </button>
      </div>
    </div>
  );
  return (
    <div className='content'>
      <div>
        <div className='heading h1'>Watch Later</div>

        {state.watchlater.length > 0 &&
          state.watchlater.map((video, index) => (
            <div
              key={index}
              className='card horizontal-card-with-text'
              style={{ margin: "1rem", marginTop: "5rem" }}>
              <Link to={`/video/${video.id}`}>
                <img
                  className='horizontal-card-img'
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.title}
                />
              </Link>

              <div
                className='card-details'
                style={{ display: "flex", flexDirection: "column" }}>
                <div className='h5 product-details' style={{ flexGrow: "1" }}>
                  {video.snippet.title}
                </div>
                <div>
                  <button className='btn-text'>
                    {" "}
                    <FontAwesomeIcon icon={faThumbsUp} size='1x' />
                  </button>
                  <span className='text-med'>
                    {" "}
                    {video.statistics.likeCount}{" "}
                  </span>
                  <button className='btn-text'>
                    <FontAwesomeIcon icon={faThumbsDown} />{" "}
                  </button>
                  <span className='text-med'>
                    {" "}
                    {video.statistics.dislikeCount}{" "}
                  </span>
                  <button className='btn-text'>
                    <FontAwesomeIcon icon={faShare} />{" "}
                  </button>
                  <span className='text-med'> Share </span>
                  <button
                    className='btn-text'
                    onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faTrash} size='1x' />
                  </button>
                </div>
                <div></div>
              </div>
              {console.log({ video })}
              {showModal && RemovePlaylistModal(video)}
            </div>
          ))}
        {state.watchlater.length === 0 && (
          <div className='h4' style={{ margin: "4rem" }}>
            Add Videos to watch later
          </div>
        )}
      </div>
    </div>
  );
};
