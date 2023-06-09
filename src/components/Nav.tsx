import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { IAppContext } from "../types";
import { updatePage } from "../store/features/animeList.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import logo from "../assetss/download.png";

interface INavProps {
  bookmarkPage: boolean;
  favoritesPage: boolean;
}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { setSearchOpened } = React.useContext(AppContext) as IAppContext;

  return (
    <nav>
      <figure className="nav__logo">
        {location.pathname === "/" ? (
          <img src={logo} className="logo" style={{cursor:"default"}}/>
        ) : (
          <img src={logo} className="logo" onClick={() => navigate("/")} />
        )}
      </figure>
      <ul className="nav__options">
        <li className="nav__options--option">
          {!props.bookmarkPage ? (
            <a
              role="button"
              className="nav__options--option-link"
              onClick={() => navigate("/bookmarks")}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </a>
          ) : (
            <a
              role="button"
              className="nav__options--option-link"
              onClick={() => {
                dispatch(updatePage({ filterChanged: true }));
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faHouse} />
            </a>
          )}
        </li>
        <li className="nav__options--option">
          <a role="button" className="nav__options--option-link"></a>
          {!props.favoritesPage ? (
            <a
              role="button"
              className="nav__options--option-link"
              onClick={() => navigate("/favorites")}
            >
              <FontAwesomeIcon icon={faStar} />
            </a>
          ) : (
            <a
              role="button"
              className="nav__options--option-link"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faHouse} />
            </a>
          )}
        </li>
        <li className="nav__options--option">
          <a
            role="button"
            className="nav__options--option-link"
            onClick={() => setSearchOpened(true)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
