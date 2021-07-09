import { usePlaylist } from "../../../context/video-context";
import LikeButton from "../../Buttons/Like";
import DisLikeButton from "../../Buttons/DisLike";
import CommentButton from "../../Buttons/Comment";
import TrashButton from "../../Buttons/Trash";
import CardImage from "../HorizontalCardImage";
import { callServer } from "../../../API/api_call";
import { useAuth } from "../../../context/auth-context";
import { useEffect } from "react";
const LikedVideosContent = () => {
  const {
    authState: { userId },
  } = useAuth();
  const {
    state: { likedVideos },
    dispatch,
    filteredVideos,
  } = usePlaylist();
  useEffect(() => {
    if (!likedVideos && userId) {
      (async () => {
        const {
          data: { likedvideos },
        } = await callServer({
          url: `/${userId}/like`,
          type: "GET",
        });
        dispatch({ type: "LOAD_LIKED_VIDEOS_DATA", value: likedvideos });
      })();
    }
  }, [userId, dispatch, likedVideos]);
  return (
    <div className='library'>
      <div className='heading'>
        <div className='h1'>Liked Videos</div>
      </div>

      {likedVideos?.map((id, index) => {
        const video = filteredVideos?.find(({ _id }) => _id === id);
        return (
          <div key={index} className='card horizontal-card-with-text card-text'>
            <CardImage video={video} />
            <div className='horizontal-card-details'>
              <div className='card-text-title'>{video?.title}</div>
              <div className='stats'>
                <LikeButton video={video} />
                <DisLikeButton video={video} />
                <CommentButton video={video} />
                <TrashButton value={id} type={"DELETE_LIKED_VIDEO"} />
              </div>
            </div>
          </div>
        );
      })}
      {likedVideos.length === 0 && (
        <div className='h4 empty-playlist'>
          You do not have any Liked Videos
        </div>
      )}
    </div>
  );
};
export default LikedVideosContent;
