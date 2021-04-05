import { Link } from "react-router-dom";
import { usePlaylist } from "../video-context";
export const VideoListing = () => {
  const { state, dispatch } = usePlaylist();

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "1rem",marginTop:"4rem",color:"black" }}>
        {state.videolist.map((video) => (
          <Link to={`/video/${video.id}`} className="card card-with-text" style={{ margin: "1rem", borderBottom: "1px solid" }}>
            <div
            style={{display:"flex",flexDirection:"column",height:"100%"}}
              key={video.id}
              onClick={() =>
                dispatch({ type: "PLAYVIDEO", value: video })}
            >
              <img className="card-img" src={video.snippet.thumbnails.high.url} alt="Not Found" />
              <p className="img-desc h5" style={{flexGrow:"1"}}>{video.snippet.title}</p>
              <div style={{paddingBottom:"0.5rem"}}>
              <span className="img-desc">{Math.round(video.statistics.viewCount/1000)}K views . </span>
              <span className="img-desc">April {video.snippet.publishedAt.substring(0,4)}</span>
              </div>
            </div>
          </Link>
         
        ))}
      </div>
    </>
  );
};
