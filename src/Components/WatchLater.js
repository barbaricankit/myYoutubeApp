import YouTube from "react-youtube";
import { usePlaylist } from "../playlist-context"

export const WatchLater=()=>{
    const {state}=usePlaylist();
    return <>
    <div>
        <div className="h2">Watch Later</div>
        
        {
            state.watchlater.length>0 &&            
            state.watchlater.map((video,index)=>(<div key={index} style={{borderBottom:"1px solid",margin:"1rem"}}>
                <YouTube videoId={video.id}/>
                <div className="h5">{video.snippet.title}</div>
                <br/>
                <div>
      <span>{video.statistics.viewCount} views . </span>
      <span>Uploaded on {video.snippet.publishedAt} </span>
      <span>Like {video.statistics.likeCount} </span>
      <span>DisLike {video.statistics.dislikeCount} </span>
      <span>Comment {video.statistics.commentCount} </span>
  
      </div>
            </div>))
        }
        {state.watchlater.length===0 && <div>Add Videos to watch later</div>}
    </div>
    </>
}