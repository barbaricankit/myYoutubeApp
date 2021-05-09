import { Link } from "react-router-dom";

export const CardImage = ({ video }) => {
  return (
    <>
      <Link to={`/video/${video.id}`}>
        <img
          className='horizontal-card-img'
          src={video.snippet.thumbnails.medium.url}
          alt={video.title}
        />
      </Link>
    </>
  );
};

export default CardImage;
