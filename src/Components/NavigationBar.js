import { Link } from "react-router-dom";
import { usePlaylist } from "../playlist-context"

export const NavigationBar=()=>{
    const {state,dispatch}=usePlaylist();
    const PLAYLIST_NAMES = Object.keys(state.playLists)
    return<>
    <div>
    <ul className="horizontal-nav-bar fixed-horizontal-bar">
            <li className="navigation-option-horizontal">
                <a href="#home" className="navigation-option">vMate</a>
            </li>
            </ul>
       <ul className="fixed-vertical-bar">
          <Link to="/" ><li className="li-element" > <span className="active navigation-option">Home</span></li></Link>
          <Link to="/library" ><li className="li-element"> <span href="#alert" className="navigation-option">Library</span></li></Link>
          <Link to="/history" ><li className="li-element"> <span href="#alert" className="navigation-option">History</span></li></Link>
          <Link to="/watch-later" ><li className="li-element"> <span  className="navigation-option">Watch Later</span></li></Link>
            {
                PLAYLIST_NAMES.map((playlistname,index)=><Link to={{pathname:`/playlist/${playlistname}`}} ><li className="li-element" key={index}> <span  className="navigation-option">{playlistname}</span></li></Link>)
            }
           </ul> 
    </div>
    </>
}