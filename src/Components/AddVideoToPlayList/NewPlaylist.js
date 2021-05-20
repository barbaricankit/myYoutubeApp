import { usePlaylistModal } from "../../context/playlist-context";
import AddNewPlayListButton from "./AddNewPlayListButton";
import NewPlayListInputField from "./NewPlayListInputField";

const AddNewPlaylist = ({ video }) => {
  const {
    modalState: { newPlayListInput },
  } = usePlaylistModal();

  return (
    <>
      {newPlayListInput ? (
        <NewPlayListInputField video={video} />
      ) : (
        <AddNewPlayListButton />
      )}
    </>
  );
};

export default AddNewPlaylist;
