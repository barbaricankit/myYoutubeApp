import {
  faBook,
  faClock,
  faHistory,
  faHome,
  faIndent,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { usePlaylist } from "../video-context";

const VerticalNavBar = () => {
  const { state, navbar, dispatch } = usePlaylist();
  const PLAYLIST_NAMES = Object.keys(state.playLists);

  return (
    <div
      ref={navbar}
      className={`nav__bar ${state.showNav ? "show-nav-bar" : ""}`}>
      <NavLink
        className='nav__item'
        end
        activeStyle={{ color: "#10B981", fontWeight: "bold" }}
        style={{ color: "black" }}
        onClick={() => dispatch({ type: "SHOW_NAV" })}
        to='/'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faHome} className='nav-icon' />
          <span className='nav-name'> Home</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ color: "#10B981", fontWeight: "bold" }}
        style={{ color: "black" }}
        onClick={() => dispatch({ type: "SHOW_NAV" })}
        to='/library'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faBook} className='nav-icon' />
          <span className='nav-name'> Library</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ color: "#10B981", fontWeight: "bold" }}
        style={{ color: "black" }}
        onClick={() => dispatch({ type: "SHOW_NAV" })}
        to='/history'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faHistory} className='nav-icon' />
          <span className='nav-name'> History</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ color: "#10B981", fontWeight: "bold" }}
        style={{ color: "black" }}
        onClick={() => dispatch({ type: "SHOW_NAV" })}
        to='/watch-later'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faClock} className='nav-icon' />
          <span className='nav-name'> Watch Later</span>
        </div>
      </NavLink>
      {PLAYLIST_NAMES.map((playlistname, index) => (
        <NavLink
          className='nav__item'
          activeStyle={{ color: "#10B981", fontWeight: "bold" }}
          style={{ color: "black" }}
          onClick={() => dispatch({ type: "SHOW_NAV" })}
          to={{ pathname: `/playlist/${playlistname}` }}>
          <div className='left-padding' key={index}>
            <FontAwesomeIcon icon={faIndent} className='nav-icon' />
            <span className='nav-name'>{playlistname}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
export default VerticalNavBar;
