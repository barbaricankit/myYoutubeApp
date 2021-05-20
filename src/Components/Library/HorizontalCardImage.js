import { Link } from "react-router-dom";
import { usePlaylist } from "../../context/video-context";

export const CardImage = ({ video }) => {
  const { dispatch } = usePlaylist();
  return (
    <>
      <Link to={`/video/${video.youtube_id}`}>
        <img
          className='horizontal-card-img'
          src={video.thumbnails.medium.url}
          alt={video.title}
          onClick={() => {
            dispatch({ type: "PLAYVIDEO", value: video.youtube_id });
          }}
        />
      </Link>
    </>
  );
};

export default CardImage;
