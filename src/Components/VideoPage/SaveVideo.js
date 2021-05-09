import { usePlaylistModal } from "../../context/playlist-context";
import PlaylistNameList from "../AddVideoToPlayList/PlayListNames";
import AddToWatchLater from "../AddVideoToPlayList/AddToWatchLater";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AddNewPlaylist from "../AddVideoToPlayList/NewPlaylist";
const SaveVideo = ({ video }) => {
  const { modalDispatch } = usePlaylistModal();
  return (
    <div className='save_video_modal'>
      <div className='playlist_modal'>
        <div className='playist_modal_header'>
          <span>Save to...</span>
          <span
            className='close-modal'
            onClick={() => {
              modalDispatch({ type: "CLOSE_MODAL" });
            }}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div>
          <AddToWatchLater video={video} />
        </div>
        <div>
          <PlaylistNameList video={video} />
        </div>
        <div className='playist_modal_footer'>
          <AddNewPlaylist video={video} />
        </div>
      </div>
    </div>
  );
};
export default SaveVideo;
