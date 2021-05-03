import { usePlaylist } from "../video-context";
import { History } from "./History";
import PlayList from "./PlayList";

import { WatchLater } from "./WatchLater";

const Library = () => {
  const { state } = usePlaylist();
  const PLAYLIST_NAMES = Object.keys(state.playLists);
  return (
    <>
      <WatchLater />
      <History />
      {PLAYLIST_NAMES.map((playlist) => (
        <PlayList playlist={playlist} />
      ))}
    </>
  );
};
export default Library;
