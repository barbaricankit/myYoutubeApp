import { callServer } from "../../API/api_call";
import { useAuth } from "../../context/auth-context";
import { usePlaylistModal } from "../../context/playlist-context";
import { usePlaylist } from "../../context/video-context";

const PlaylistNameList = ({ video }) => {
  const { state, dispatch } = usePlaylist();
  const { modalDispatch, manageToast } = usePlaylistModal();
  const {
    authState: { userId },
  } = useAuth();

  const PLAYLIST = state.playLists;

  const isVideoInPlaylist = (video, playlist) =>
    playlist.videoIds.find((id) => video._id === id) === undefined
      ? false
      : true;

  const managePlayList = async ({ playlist }) => {
    const { data } = await callServer({
      url: `/${userId}/${playlist.playlistName}`,
      type: "POST",
      body: { videoId: video._id },
    });
    if (data.success) {
      dispatch({
        type: "SELECTED_PLAYLIST",
        value: { playlistName: playlist.playlistName, video_id: video._id },
      });

      modalDispatch({
        type: "ADD_TO_PLAYLIST",
        value: {
          flag: !isVideoInPlaylist(video, playlist),
          playListName: playlist.playlistName,
        },
      });
      manageToast();
    } else {
      console.log("Something went wrong! Couldn't add video to the playlist");
    }
  };

  return (
    <>
      {PLAYLIST.map((playlist, index) => {
        return (
          <div
            key={index}
            className='playlist'
            onClick={() => managePlayList({ playlist })}>
            <input
              type='checkbox'
              checked={isVideoInPlaylist(video, playlist)}
            />
            <span className='playlist_name'>{playlist.playlistName}</span>
          </div>
        );
      })}
    </>
  );
};

export default PlaylistNameList;
