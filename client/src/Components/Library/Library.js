import { usePlaylist } from "../../context/video-context";
import HistoryContent from "./History/HistoryContent";
import LikedVideosContent from "./LikedVideos/LikedVideosContent";
import PlayListContent from "./PlayList/PlayListContent";

import WatchLaterContent from "./WatchLater/WatchLaterContent";

const Library = () => {
  const { state } = usePlaylist();

  return (
    <div className='content'>
      <HistoryContent />
      <WatchLaterContent />
      <LikedVideosContent />
      {state.playLists.map((playlist, index) => (
        <PlayListContent playlist={playlist} key={index} />
      ))}
    </div>
  );
};
export default Library;
