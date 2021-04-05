import { faBook, faClock, faHistory, faHome, faIndent, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { usePlaylist } from "../video-context";

export const NavigationBar=()=>{
    const {state}=usePlaylist();
    const PLAYLIST_NAMES = Object.keys(state.playLists)
 
    return<>
    <div>
    <ul className="horizontal-nav-bar fixed-horizontal-bar">
        <div>
            <li className="navigation-option-horizontal navigation-option navigation-top">
                <span className="logo-text"><FontAwesomeIcon icon={faPlay} className="logo" /><span className="logo-txt"> cricVideo</span> </span>
            </li>
            <li className="navigation-option-horizontal navigation-option navigation-top"><input type="search" placeholder="Search for any video" className="search-box"/></li>
            </div>
            <li class="navigation-option-horizontal"><span class="avatar-double-letter nav-avatar">AS</span></li>
            </ul>
       <ul className="fixed-vertical-bar">
          <NavLink end activeStyle={{color: "#10B981",fontWeight:"bold"}} style={{color:"black"}} to="/" ><li className="li-element navigation-option navigation-bottom"  > <FontAwesomeIcon icon={faHome}  className="nav-icon" size="1x"/> <span className="nav-name" > Home</span></li></NavLink >
          <NavLink activeStyle={{color: "#10B981",fontWeight:"bold"}} style={{color:"black"}} to="/library" ><li className="li-element navigation-option navigation-bottom" ><FontAwesomeIcon icon={faBook} className="nav-icon" size="1x"/><span className="nav-name"> Library</span></li></NavLink >
          <NavLink activeStyle={{color: "#10B981",fontWeight:"bold"}} style={{color:"black"}} to="/history" ><li className="li-element navigation-option navigation-bottom" ><FontAwesomeIcon icon={faHistory} className="nav-icon" size="1x"/> <span className="nav-name">  History</span></li></NavLink >
          <NavLink activeStyle={{color: "#10B981",fontWeight:"bold"}} style={{color:"black"}} to="/watch-later" ><li className="li-element navigation-option navigation-bottom" > <FontAwesomeIcon icon={faClock} className="nav-icon" size="1x"/> <span className="nav-name"> Watch Later</span></li></NavLink >
            {
                PLAYLIST_NAMES.map((playlistname,index)=><NavLink activeStyle={{color: "#10B981",fontWeight:"bold"}} style={{color:"black"}} to={{pathname:`/playlist/${playlistname}`}} ><li className="li-element navigation-option navigation-bottom"  key={index}><FontAwesomeIcon icon={faIndent} className="nav-icon" size="1x"/> <span className="nav-name">{playlistname}</span></li></NavLink >)
            }
           </ul> 
    </div>
    </>
}