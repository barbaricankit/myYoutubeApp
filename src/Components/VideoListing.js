import { Link } from "react-router-dom";
import { usePlaylist } from "../playlist-context";
export const VideoListing = () => {
  const { state, dispatch } = usePlaylist();

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "1rem" }}>
        {state.videolist.map((video) => (
          <Link to={`/video/${video.id}`} className="card card-with-text" style={{ margin: "1rem", borderBottom: "1px solid" }}>
            <div
              key={video.id}
              onClick={() =>
                dispatch({ type: "PLAYVIDEO", value: video })}
            >
              <img className="card-img" src={video.snippet.thumbnails.high.url} alt="Not Found" />
              <p>{video.snippet.title}</p>
              <span>{video.statistics.viewCount} views . </span>
              <span>{video.snippet.publishedAt}</span>
            </div>
          </Link>
         
        ))}
      </div>
    </>
  );
};
