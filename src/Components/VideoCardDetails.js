const VideoCardDetails = ({ video }) => {
  return (
    <div className='card-details'>
      <div style={{ flexGrow: "1" }}>
        <h4 className='card-text-title'>{video.snippet.title}</h4>
      </div>
      <div>
        <span className='desc'>
          {Math.round(video.statistics.viewCount / 1000)}K views .{" "}
        </span>
        <span className='desc'>
          April {video.snippet.publishedAt.substring(0, 4)}
        </span>
      </div>
    </div>
  );
};

export default VideoCardDetails;
