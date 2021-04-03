import { faComment, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { usePlaylist } from "../playlist-context";
import { PlaylistModal } from "./PlaylistModal";

export const VideoPage = () => {
  const { state, dispatch } = usePlaylist();
  const [showToast,setShowToast]=useState("toast-desc-1");
  const [addToWatchLater,setAddToWatchLater]=useState(false);
  const {videoId}=useParams();
  const video=state.videolist.find(video=>video.id===videoId);
  console.log(state.videolist,videoId)
  const opts = {
    height: video.snippet.thumbnails.standard.height,
    width: video.snippet.thumbnails.standard.width,
    playerVars: {
      autoplay: 1
    }
  };
  const manageToast=()=>{
    setShowToast(showToast=>showToast+" show")
    setTimeout(()=>{
      setShowToast(showToast=>showToast.replace("show",""))
    },2000)
  }
  return (
    <div >
      <YouTube
        videoId={video.id}
        onPlay={()=>dispatch({type:"ADD_VIDEO_TO_HISTORY",value:video})}
        opts={opts}
       
      />
      <h1>{video.snippet.title}</h1>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <span>{video.statistics.viewCount} views . </span>
      <span>Uploaded on {video.snippet.publishedAt} </span>
      <span> <FontAwesomeIcon icon={faThumbsUp} size="1x" style={{color:"blue"}}/> {video.statistics.likeCount} </span>
      <span><FontAwesomeIcon icon={faThumbsDown} /> {video.statistics.dislikeCount} </span>
      <span><FontAwesomeIcon icon={faComment} /> {video.statistics.commentCount} </span>
     
      </div>
      <div>
        <button
        className="btn-primary"
          onClick={() => dispatch({type:"PLAYLIST_OPTIONS"})}
        >
          Add to Playlist
        </button>
        <button className="btn-primary" onClick={() => {dispatch({type:"ADD_TO_WATCH_LATER",value:{addOrRemove:!addToWatchLater, video:video}});manageToast();setAddToWatchLater(!addToWatchLater)}}>
        {video.watchlater?"Added to Watch Later":"Add to Watch Later"}
          </button>
          <PlaylistModal />
      </div>
      {addToWatchLater && <div className={showToast}>Added to Watch Later</div>}
      {!addToWatchLater && <div className={showToast}>Removed from Watch Later</div>}
    </div>
  );
};
