import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { AppContext } from "../../App";
import { IAppContext } from "../../types";
import SearchData from "./SearchData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  emptyState,
  searchAnime,
} from "../../store/features/searchedAnime.reducer";
import useDebounce from "../../utils/useDebounce";

interface ISearchProps {
  setSearchOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.searchedAnimeReducer.isLoading
  );
  const { setSearchOpened } = React.useContext(AppContext) as IAppContext;
  const [isChecked, setIsChecked] = React.useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const debounceValue = useDebounce(searchValue, 1000);

  const onEsc = (): void => {
    setSearchOpened(false);
    dispatch(emptyState());
  };

  React.useEffect(() => {
    if (debounceValue !== "") {
      dispatch(
        searchAnime(
          `https://api.jikan.moe/v4/anime?q=${debounceValue}&${
            isChecked ? "sfw" : ""
          }`
        )
      );
    }
  }, [debounceValue, isChecked]);

  return (
    <div className="search__wrapper">
      <div className="search__block">
        <div className="search">
          <div className="search__icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div className="search__input">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {isLoading && (
              <div className="loading__spinner">
                <FontAwesomeIcon icon={faSpinner} className="spinner" />
              </div>
            )}
          </div>
          <ul className="search__buttons">
            <li className="search__buttons--button">
              <label htmlFor="active">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  onChange={(e) => setIsChecked(!e.target.checked)}
                />
                {isChecked ? (
                  <span style={{ backgroundColor: "#059669" }}>active:SFW</span>
                ) : (
                  <span style={{ backgroundColor: "#cc2323" }}>
                    active:NSFW
                  </span>
                )}
              </label>
            </li>
            <li className="search__buttons--button">
              <a role="button" id="esc" onClick={onEsc}>
                <p>ESC</p>
              </a>
            </li>
          </ul>
        </div>
        <SearchData />
      </div>
    </div>
  );
};

export default Search;
