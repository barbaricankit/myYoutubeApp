import {
  faBars,
  faChevronLeft,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlaylist } from "../video-context";

const NavigationBar = () => {
  const { dispatch } = usePlaylist();
  const [searchText, setSearchText] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuBtn = useRef(null);

  return (
    <header>
      <div className={`search_bar ${showSearchBox ? "show-search_bar" : ""}`}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className='back_icon'
          size='1x'
          onClick={() => setShowSearchBox(false)}
        />
        <input
          type='search'
          placeholder='Search your products...'
          className='search_text'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            dispatch({ type: "SEARCH_ACTION", value: e.target.value });
          }}
        />
        <FontAwesomeIcon icon={faSearch} size='1x' className='srch-icon' />
      </div>
      <div class='page_header'>
        <div className='menu_elem'>
          <div className='menu__item menu-btn '>
            <div ref={menuBtn} onClick={() => dispatch({ type: "SHOW_NAV" })}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <NavLink
            end
            className='menu__item nav__item'
            activeStyle={{ color: "lightblue" }}
            to='/'>
            <div className='logo-details'>
              <FontAwesomeIcon icon={faPlay} className='logo' />
              <span className='logo-text'>CRICVideo</span>
            </div>
          </NavLink>
        </div>
        {/* <div className='menu_elem'>
          <div className='menu__item nav__item'>
            <span className='logo-text'>
              <FontAwesomeIcon icon={faPlay} className='logo' />
              <span className='logo-text'> cricVideo</span>{" "}
            </span>
          </div>
        </div> */}
        <div className='menu__item menu_search'>
          <input
            type='search'
            placeholder='Search your products...'
            className='search_box'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              dispatch({ type: "SEARCH_ACTION", value: e.target.value });
            }}
          />
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
        </div>
        {/* <div className='navigation-option-horizontal navigation-option navigation-top'>
          <input
            type='search'
            placeholder='Search for any video'
            className='search-box'
          />
        </div> */}
        {/* <div className='menu__item'>
          <FontAwesomeIcon icon={faSearch} className='search-icon-menu' />
        </div> */}
        <div class='user'>
          <div className='menu__item'>
            <FontAwesomeIcon
              icon={faSearch}
              className='search-icon-menu'
              onClick={() => setShowSearchBox((prevValue) => !prevValue)}
            />
          </div>
          <span
          // onClick={() => setShowOptions((showOptions) => !showOptions)}
          >
            <img
              className='avatar-sm nav-avatar'
              src='https://scontent.fccu18-1.fna.fbcdn.net/v/t1.18169-9/24131585_1571374906276687_711347645622454609_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=174925&_nc_ohc=qYsIzSYAFNYAX8n-I26&_nc_ht=scontent.fccu18-1.fna&oh=a01b504ade77a7298f5b2dab96ed5f7a&oe=609CED38'
              alt='userimage'
            />
          </span>
        </div>

        {/* <ul className='fixed-vertical-bar'>
          <NavLink
            end
            activeStyle={{ color: "#10B981", fontWeight: "bold" }}
            style={{ color: "black" }}
            to='/'>
            <li className='li-element navigation-option navigation-bottom'>
              {" "}
              <FontAwesomeIcon
                icon={faHome}
                className='nav-icon'
                size='1x'
              />{" "}
              <span className='nav-name'> Home</span>
            </li>
          </NavLink>
          <NavLink
            activeStyle={{ color: "#10B981", fontWeight: "bold" }}
            style={{ color: "black" }}
            to='/library'>
            <li className='li-element navigation-option navigation-bottom'>
              <FontAwesomeIcon icon={faBook} className='nav-icon' size='1x' />
              <span className='nav-name'> Library</span>
            </li>
          </NavLink>
          <NavLink
            activeStyle={{ color: "#10B981", fontWeight: "bold" }}
            style={{ color: "black" }}
            to='/history'>
            <li className='li-element navigation-option navigation-bottom'>
              <FontAwesomeIcon
                icon={faHistory}
                className='nav-icon'
                size='1x'
              />{" "}
              <span className='nav-name'> History</span>
            </li>
          </NavLink>
          <NavLink
            activeStyle={{ color: "#10B981", fontWeight: "bold" }}
            style={{ color: "black" }}
            to='/watch-later'>
            <li className='li-element navigation-option navigation-bottom'>
              {" "}
              <FontAwesomeIcon
                icon={faClock}
                className='nav-icon'
                size='1x'
              />{" "}
              <span className='nav-name'> Watch Later</span>
            </li>
          </NavLink>
          {PLAYLIST_NAMES.map((playlistname, index) => (
            <NavLink
              activeStyle={{ color: "#10B981", fontWeight: "bold" }}
              style={{ color: "black" }}
              to={{ pathname: `/playlist/${playlistname}` }}>
              <li
                className='li-element navigation-option navigation-bottom'
                key={index}>
                <FontAwesomeIcon
                  icon={faIndent}
                  className='nav-icon'
                  size='1x'
                />{" "}
                <span className='nav-name'>{playlistname}</span>
              </li>
            </NavLink>
          ))}
        </ul>
       */}
      </div>
    </header>
  );
};

export default NavigationBar;
