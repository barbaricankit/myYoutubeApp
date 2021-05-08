import { usePlaylist } from "../../../context/video-context";
import LikeButton from "../../Buttons/Like";
import DisLikeButton from "../../Buttons/DisLike";
import CommentButton from "../../Buttons/Comment";
import TrashButton from "../../Buttons/Trash";
import CardImage from "../HorizontalCardImage";
import { useParams } from "react-router-dom";
import { usePlaylistModal } from "../../../context/playlist-context";
import DeletePlayListModal from "./DeletePlaylistModal";
import DeletePlaylistTrashButton from "../../Buttons/DeletePlaylistTrash";

const PlayListContent = ({ playlist }) => {
  const { state } = usePlaylist();
  const { playlistname } = useParams();
  const {
    modalState: { deletePlayListModal },
  } = usePlaylistModal();
  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>
          <div>{playlistname === undefined ? playlist : playlistname}</div>
          <DeletePlaylistTrashButton />
        </div>
      </div>
      {state.playLists[playlistname === undefined ? playlist : playlistname]
        .length === 0 && (
        <div className='h4 empty-playlist'>
          Add your favourite Videos into the
          {playlistname === undefined ? playlist : playlistname} playlist
        </div>
      )}
      <div>
        {state.playLists[
          playlistname === undefined ? playlist : playlistname
        ].map((video, index) => (
          <div key={index} className='card horizontal-card-with-text card-text'>
            <CardImage video={video} />
            <div className='horizontal-card-details'>
              <h3 className='card-text-title'>{video.snippet.title}</h3>
              <div className='stats'>
                <LikeButton video={video} />
                <DisLikeButton video={video} />
                <CommentButton video={video} />
                <TrashButton
                  type={"REMOVE_VIDEO_FROM_PLAYLIST"}
                  value={{ playlistName: playlistname, video: video }}
                />
              </div>
            </div>
          </div>
        ))}
        {deletePlayListModal && <DeletePlayListModal />}
      </div>
    </div>
  );
};
export default PlayListContent;
