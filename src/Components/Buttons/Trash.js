import "../../App.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylist } from "../../context/video-context";
const TrashButton = ({ value, type }) => {
  const { dispatch } = usePlaylist();
  return (
    <div
      className='stat'
      onClick={() =>
        dispatch({
          type: type,
          value: value,
        })
      }>
      <FontAwesomeIcon className='stat-icon' icon={faTrash} />
    </div>
  );
};

export default TrashButton;
