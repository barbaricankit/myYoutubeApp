import { faTrash, faThumbsUp, faThumbsDown, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylist } from "../video-context";

export const PlayList = ({playlist}) => {
    const { state, dispatch } = usePlaylist()
    const [showModal, setShowModal] = useState(false);
    const {playlistname}=useParams();
    const RemovePlaylistModal = ({ playListName, video }) =>

        <div className="modal" style={{position:"fixed",zIndex:"1" }}>
            <div class="modal-header">
            <h3 className="modal-title">Remove Video from playlist </h3>
		    <button className="close-modal" onClick={() => setShowModal(false)}>x</button>
           
            </div>
            <p className="modal-txt">Are you sure you want to delete the video from {playListName} playlist?</p>
            <div className="btn-modal">
                <button className="btn-text" onClick={() => setShowModal(false)} ><span className="h6">Cancel</span></button>
                <button className="btn-primary" onClick={() => {
                    
                    setShowModal(false);
                    dispatch({ type: "REMOVE_VIDEO_FROM_PLAYLIST", value: {playlistName:playListName,video:video} });} }>Remove</button>
            </div>
        </div>
    return <>
        <div >
        <div className="heading h1">{playlistname===undefined?playlist:playlistname}</div>
            {state.playLists[playlistname===undefined?playlist:playlistname].length === 0 ? <div className="h4" style={{margin:"4rem"}}>Add your favourite Videos into the {playlistname===undefined?playlist:playlistname} playlist</div> : <div className="h2">{playlistname}</div>}
            <div style={{ margin: "1rem" }}>
                {

                    state.playLists[playlistname===undefined?playlist:playlistname].map(video =>
                    (<div className="card horizontal-card-with-text" style={{ margin: "1rem" }} >
                        <img className="horizontal-card-img" src={video.snippet.thumbnails.medium.url} alt={video.title} />
                        <div className="card-details" style={{ display: "flex", flexDirection: "column" }}>
                            <div className="h5 product-details" style={{ flexGrow: "1" }}>{video.snippet.title}</div>
                            <div>
                                <button className="btn-text" onClick={() => console.log()}> <FontAwesomeIcon icon={faThumbsUp} size="1x" /></button>
                                <span className="text-med"> {video.statistics.likeCount} </span>
                                <button className="btn-text"><FontAwesomeIcon icon={faThumbsDown} />  </button>
                                <span className="text-med"> {video.statistics.dislikeCount} </span>
                                <button className="btn-text"><FontAwesomeIcon icon={faShare} />  </button>
                                <span className="text-med"> Share </span>
                                <button className="btn-text" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faTrash} size="1x" /></button>
                            </div>
                            <div>


                            </div>
                        </div>
                        {showModal && <RemovePlaylistModal playListName={playlistname} video={video} />}
                    </div>

                    )

                    )
                }
            </div>


        </div>
    </>
}