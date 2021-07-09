import { useEffect, useState } from "react";
const VideoImage = ({ video }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize(window.innerWidth));
  });

  return (
    <>
      <img
        className='card-img'
        src={
          screenSize > 675
            ? video.thumbnails.medium.url
            : video.thumbnails.standard.url
        }
        alt='Not Found'
      />
    </>
  );
};

export default VideoImage;
