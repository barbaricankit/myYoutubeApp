import { usePlaylist } from "../../context/video-context";
import HistoryContent from "./History/HistoryContent";
import LikedVideosContent from "./LikedVideos/LikedVideosContent";
import PlayListContent from "./PlayList/PlayListContent";

import WatchLaterContent from "./WatchLater/WatchLaterContent";

const Library = () => {
  const { state } = usePlaylist();
  const PLAYLIST_NAMES = Object.keys(state.playLists);
  return (
    <div className='content'>
      <HistoryContent />
      <WatchLaterContent />
      <LikedVideosContent />
      {PLAYLIST_NAMES.map((playlist, index) => (
        <PlayListContent playlist={playlist} key={index} />
      ))}
    </div>
  );
};
export default Library;
