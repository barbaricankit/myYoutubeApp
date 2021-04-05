import { useState } from "react";
import { usePlaylist } from "../video-context";

export const PlaylistModal = () => {
    const { state, dispatch } = usePlaylist();
    const [showNewPlayListInput, setShowNewPlayListInput] = useState(false);
    const [newPlaylistText, setnewPlaylistText] = useState("");
    const [addtoPlaylist,setAddtoPlaylist]=useState(false);
    const [showToast,setShowToast]=useState("toast-desc-1");
    const [playlistSelected,setPlaylistSelected]=useState("");
    const PLAYLIST_NAMES = Object.keys(state.playLists)
    const manageToast=()=>{
        
        setShowToast(showToast=>showToast+" show")
        setTimeout(()=>{
          setShowToast(showToast=>showToast.replace("show",""))
        },2000)

      }
      
      
      const isPlaylistCheckboxChecked=(playlist)=>state.playVideo.playlists.find(playlst => playlst === playlist) === undefined ? false : true
    //Find the video which is currently played, then checking whether the playlist selected is already present, if present then remove it through filter and if not present then add it to the playlist object for that video
    const addVideoToPlayList = (video, playListName) =>
        state.videolist.map(vid => vid.id === video.id ? ({ ...vid, playlists: vid.playlists.find(playlist => playListName === playlist) === undefined ? [...vid.playlists, playListName] : vid.playlists.filter(playlist => playlist !== playListName) }) : vid)

    const managePlaylistAndVideoList = (playlist) => {
        dispatch({ type: "ADDED_VIDEO_TO_PLAYLIST", value: { videos: addVideoToPlayList(state.playVideo, playlist), playlistname: playlist } });
        dispatch({ type: "SELECTED_PLAYLIST", value: { playlistName: playlist, video: state.playVideo } });
    }
    const PlaylistNameList=()=>{
       return <><li key="0" className="stacked-list-item">Save to.. <button className="badges" onClick={() =>{setnewPlaylistText("");setShowNewPlayListInput(false); dispatch({ type: "PLAYLIST_OPTIONS" })}}>x</button></li>
       {PLAYLIST_NAMES.map((playlist, index) => {
            return <li key={index + 1} className="stacked-list-item">
                <input className="btn-toast-1" type="checkbox" checked={isPlaylistCheckboxChecked(playlist)} onClick={() => {
                    managePlaylistAndVideoList(playlist);
                    manageToast();
                    setAddtoPlaylist(!isPlaylistCheckboxChecked(playlist));
                    setPlaylistSelected(playlist)
                }} />
                <span> {playlist}</span>
                {/* <div className="toast-desc-1">Added to {playlist}</div> */}
            </li>

        })}</>
    }
    const AddNewPlaylist=()=>{
        if(!showNewPlayListInput)
        return <li className="stacked-list-item" onClick={() => setShowNewPlayListInput(true)}>
        <button className="btn-text">+</button> Create New Playlist</li>
        return <li className="stacked-list-item">
        <input className="textbox" type="text" placeholder="Add your custom playlist" value={newPlaylistText}  onChange={(e) => setnewPlaylistText(()=>e.target.value)} />
        <button className="btn-text" disabled={newPlaylistText === '' ? true : false} onClick={() => {
            dispatch({ type: "NEW_PLAYLIST_ADDED", value: { playlistName: newPlaylistText, video: state.playVideo } });
            dispatch({ type: "ADDED_VIDEO_TO_PLAYLIST", value: { videos: addVideoToPlayList(state.playVideo, newPlaylistText), playlistname: newPlaylistText } });
            dispatch({ type: "PLAYLIST_OPTIONS" });
            setAddtoPlaylist(!isPlaylistCheckboxChecked(newPlaylistText));
            setPlaylistSelected(newPlaylistText)
            manageToast();
        }}>
            Add</button>
        </li>

    }
    console.log(newPlaylistText)
    return <>
        <div style={{ position: "absolute",bottom:"5rem",left:"5rem", zIndex: "3",overflowY: "auto", height:"30rem" }}>
            {state.showPlayListOptions &&
                (
                    <ul className="stacked-lists" >
                        
                        <PlaylistNameList />
                        {AddNewPlaylist()}
                        
                        
                    </ul>)}
                    {addtoPlaylist ?<div className={showToast}>Added to {playlistSelected}</div>:<div className={showToast}>Removed from {playlistSelected}</div>}
                    
        </div>
    </>
}