import "../../App.css";

const TotalVideoViews = ({ viewCount }) => {
  const showView = ({ viewCount }) => {
    if (viewCount / 1000000 > 0.1)
      return `${(viewCount / 1000000).toFixed(2)}M`;
    else if (viewCount / 1000 > 0.5) return `${(viewCount / 1000).toFixed(2)}K`;
    else return `${Math.round(viewCount)}`;
  };
  return <div>{showView({ viewCount })} views . </div>;
};

export default TotalVideoViews;
