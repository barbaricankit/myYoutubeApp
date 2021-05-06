export const showView = ({ count }) => {
  if (count / 1000000 > 0.1) return `${(count / 1000000).toFixed(2)}M`;
  else if (count / 1000 > 0.5) return `${(count / 1000).toFixed(2)}K`;
  else return `${Math.round(count)}`;
};
