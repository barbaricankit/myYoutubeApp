import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { usePlaylistModal } from "../../context/playlist-context";

const AddNewPlayListButton = () => {
  const { modalDispatch } = usePlaylistModal();
  const {
    authState: { login },
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      className='playlist'
      onClick={() =>
        login
          ? modalDispatch({
              type: "SHOW_HIDE_NEW_PLAYLIST_INPUT_FIELD",
              value: true,
            })
          : navigate("/signin")
      }>
      <FontAwesomeIcon icon={faPlus} />
      <span className='playlist_name'>Create New Playlist</span>
    </div>
  );
};
export default AddNewPlayListButton;
