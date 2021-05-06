import { usePlaylistModal } from "../../context/playlist-context";
import { usePlaylist } from "../../context/video-context";

const PlaylistNameList = ({ video }) => {
  const { state, dispatch } = usePlaylist();
  const { modalDispatch, manageToast } = usePlaylistModal();
  const PLAYLIST_NAMES = Object.keys(state.playLists);
  const addVideoToPlayList = (video, playListName) =>
    state.videolist.map((vid) =>
      vid.id === video.id
        ? {
            ...vid,
            playlists:
              vid.playlists.find((playlist) => playListName === playlist) ===
              undefined
                ? [...vid.playlists, playListName]
                : vid.playlists.filter((playlist) => playlist !== playListName),
          }
        : vid
    );

  const managePlaylistAndVideoList = (playlist) => {
    dispatch({
      type: "ADDED_VIDEO_TO_PLAYLIST",
      value: {
        videos: addVideoToPlayList(video, playlist),
        playlistname: playlist,
      },
    });
    dispatch({
      type: "SELECTED_PLAYLIST",
      value: { playlistName: playlist, video: video },
    });
  };
  const isPlaylistCheckboxChecked = (playlist) =>
    video.playlists.find((playlst) => playlst === playlist) === undefined
      ? false
      : true;
  return (
    <>
      {PLAYLIST_NAMES.map((playlist, index) => {
        return (
          <div
            key={index + 1}
            className='playlist'
            onClick={() => {
              managePlaylistAndVideoList(playlist);
              manageToast();
              modalDispatch({
                type: "ADD_TO_PLAYLIST",
                value: {
                  flag: !isPlaylistCheckboxChecked(playlist),
                  playListName: playlist,
                },
              });
            }}>
            <input
              type='checkbox'
              checked={isPlaylistCheckboxChecked(playlist)}
            />
            <span className='playlist_name'>{playlist}</span>
          </div>
        );
      })}
    </>
  );
};

export default PlaylistNameList;
