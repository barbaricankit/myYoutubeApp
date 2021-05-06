import "../../App.css";
import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylistModal } from "../../context/playlist-context";
const SaveButton = ({ video }) => {
  const { modalDispatch } = usePlaylistModal();
  return (
    <div
      className='stat'
      onClick={() => {
        modalDispatch({ type: "OPEN_MODAL" });
      }}>
      <FontAwesomeIcon className='stat-icon' icon={faIndent} />
      <span className='stat-count'>SAVE</span>
    </div>
  );
};

export default SaveButton;
