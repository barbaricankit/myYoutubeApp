import {
  faBook,
  faClock,
  faHistory,
  faHome,
  faIndent,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { usePlaylist } from "../../context/video-context";

const VerticalNavBar = () => {
  const { state, navbar, dispatch } = usePlaylist();
  const PLAYLIST = state.playLists;
  return (
    <div
      ref={navbar}
      className={`nav__bar ${state.showNav ? "show-nav-bar" : ""}`}>
      <NavLink
        className='nav__item'
        end
        activeStyle={{ fontWeight: "bold" }}
        onClick={() => dispatch({ type: "CLOSE_NAV" })}
        to='/'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faHome} className='nav-icon' />
          <span className='nav-name'> Home</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ fontWeight: "bold" }}
        onClick={() => dispatch({ type: "CLOSE_NAV" })}
        to='/library'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faBook} className='nav-icon' />
          <span className='nav-name'> Library</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ fontWeight: "bold" }}
        onClick={() => dispatch({ type: "CLOSE_NAV" })}
        to='/history'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faHistory} className='nav-icon' />
          <span className='nav-name'> History</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ fontWeight: "bold" }}
        onClick={() => dispatch({ type: "CLOSE_NAV" })}
        to='/liked-videos'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faThumbsUp} className='nav-icon' />
          <span className='nav-name'> Liked Videos</span>
        </div>
      </NavLink>
      <NavLink
        className='nav__item'
        activeStyle={{ fontWeight: "bold" }}
        onClick={() => dispatch({ type: "CLOSE_NAV" })}
        to='/watch-later'>
        <div className='left-padding'>
          <FontAwesomeIcon icon={faClock} className='nav-icon' />
          <span className='nav-name'> Watch Later</span>
        </div>
      </NavLink>
      {PLAYLIST.map(({ playlistName }, index) => (
        <NavLink
          key={index}
          className='nav__item'
          activeStyle={{ fontWeight: "bold" }}
          onClick={() => dispatch({ type: "CLOSE_NAV" })}
          to={{ pathname: `/playlist/${playlistName}` }}>
          <div className='left-padding'>
            <FontAwesomeIcon icon={faIndent} className='nav-icon' />
            <span className='nav-name'>{playlistName}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
export default VerticalNavBar;
