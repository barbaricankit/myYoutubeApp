import { NavLink } from 'react-router-dom'
import { usePlaylist } from '../../context/video-context'
import { faCircleNotch, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VideoCardDetails from './VideoCardDetails'
import VideoImage from './VideoImage'
import { usePlaylistModal } from '../../context/playlist-context'
import SaveVideo from '../VideoPage/SaveVideo'
import { useEffect } from 'react'
import ShowToast from '../AddVideoToPlayList/ShowToast'
export const VideoListing = () => {
  const {
    state: { status },
    dispatch,
    filteredVideos,
    current_play_video: play_video,
  } = usePlaylist()
  const {
    modalState: { playlistModal, video },
    modalDispatch,
  } = usePlaylistModal()
  useEffect(() => {
    if (play_video) {
      dispatch({ type: 'REMOVE_PLAY_VIDEO' })
    }
    return () => {
      modalDispatch({ type: 'CLOSE_MODAL' })
    }
  }, [dispatch, modalDispatch, play_video])
  console.log({ status })
  return (
    <div className="content">
      {status === 'loading' && (
        <FontAwesomeIcon
          icon={faCircleNotch}
          size="4x"
          className="btn-color fa-spin"
        />
      )}
      <div className="cards">
        {filteredVideos.map((video, index) => (
          <div className="video_link video" key={index}>
            <NavLink
              to={`/video/${video.youtube_id}`}
              className="video_link"
              onClick={() => {
                dispatch({ type: 'PLAY_VIDEO', value: video.youtube_id })
              }}
            >
              <div
                key={video.youtube_id}
                className="card card-with-text card-text"
              >
                <VideoImage video={video} />

                <VideoCardDetails video={video} />
              </div>
            </NavLink>
            <div
              onClick={() => {
                modalDispatch({ type: 'OPEN_MODAL', video })
              }}
            >
              <button className="ellipsis-btn">
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {playlistModal && <SaveVideo video={video} />}
      <ShowToast />
    </div>
  )
}
