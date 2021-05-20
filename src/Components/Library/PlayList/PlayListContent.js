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
import { useEffect } from "react";
import { callServer } from "../../../API/api_call";
import { useAuth } from "../../../context/auth-context";

const PlayListContent = ({ playlist }) => {
  const { state, dispatch, filteredVideos } = usePlaylist();
  const {
    authState: { userId },
  } = useAuth();
  const { playlistname } = useParams();
  const {
    modalState: { deletePlayListModal },
  } = usePlaylistModal();

  const current_playlist = playlistname ? playlistname : playlist.playlistName;

  const PLAYLIST = state.playLists.find(
    (play_list) => play_list.playlistName === current_playlist
  );
  useEffect(() => {
    if (!PLAYLIST && userId) {
      (async () => {
        const {
          data: { playlists },
        } = await callServer({
          url: `/${userId}/${playlistname}`,
          type: "GET",
        });
        dispatch({ type: "LOAD_PLAYLIST_DATA", value: playlists });
      })();
    }
  }, [userId, dispatch, PLAYLIST, playlistname]);
  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>
          <div>{current_playlist}</div>
          <DeletePlaylistTrashButton />
        </div>
      </div>
      {PLAYLIST?.length === 0 && (
        <div className='h4 empty-playlist'>
          Add your favourite Videos into the
          {current_playlist} playlist
        </div>
      )}
      <div>
        {PLAYLIST?.videoIds.map((id, index) => {
          const video = filteredVideos.find(({ _id }) => _id === id);
          return (
            <div
              key={index}
              className='card horizontal-card-with-text card-text'>
              <CardImage video={video} />
              <div className='horizontal-card-details'>
                <div className='card-text-title'>{video.title}</div>
                <div className='stats'>
                  <LikeButton video={video} />
                  <DisLikeButton video={video} />
                  <CommentButton video={video} />
                  <TrashButton
                    type={"REMOVE_VIDEO_FROM_PLAYLIST"}
                    value={{
                      playlistName: current_playlist,
                      video_id: id,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {deletePlayListModal && <DeletePlayListModal />}
      </div>
    </div>
  );
};
export default PlayListContent;
