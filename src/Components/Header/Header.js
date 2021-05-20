import {
  faBars,
  faChevronLeft,
  faPlay,
  faSearch,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { usePlaylist } from "../../context/video-context";

const Header = () => {
  const { dispatch } = usePlaylist();
  const {
    authState: { login, userInitials },
    authDispatch,
  } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const userRef = useRef(null);
  const menuBtn = useRef(null);
  const navigate = useNavigate();
  const logoutFunction = () => {
    localStorage.removeItem("user_video_lib");
    authDispatch({ type: "LOGOUT" });
    dispatch({ type: "INITIAL_STATE" });
    setShowOptions(false);
    navigate("/");
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    });
  });
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
      <div className='page_header'>
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

        <div className='user'>
          <div className='menu__item'>
            <FontAwesomeIcon
              icon={faSearch}
              className='search-icon-menu'
              onClick={() => setShowSearchBox((prevValue) => !prevValue)}
            />
          </div>

          {login && (
            <span
              ref={userRef}
              onClick={() => setShowOptions((prevValue) => !prevValue)}>
              <span className='single-letter-avatar avatar-sm'>
                {userInitials}
              </span>
            </span>
          )}
          {!login && (
            <span onClick={() => navigate("/signin")}>
              <FontAwesomeIcon icon={faSignInAlt} />
            </span>
          )}
          {showOptions && (
            <div className='user-menu'>
              <div className='user-sub-menu'>
                <div>Profile</div>
              </div>
              <div
                className='user-sub-menu'
                onClick={() => {
                  logoutFunction();
                }}>
                <div>Logout</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
