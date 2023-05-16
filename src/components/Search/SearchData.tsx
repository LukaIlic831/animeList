import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { IAppContext } from "../../types";
import { emptyState } from "../../store/features/searchedAnime.reducer";

interface ISearchDataProps {}

const SearchData: React.FunctionComponent<ISearchDataProps> = (props) => {
  const searchedAnimeList = useSelector(
    (state: RootState) => state.searchedAnimeReducer.animeList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setSearchOpened } = React.useContext(AppContext) as IAppContext;

  const openAnime = (id: number): void => {
    setSearchOpened(false);
    navigate(`/anime/${id}`);
    setTimeout(() => {
      dispatch(emptyState());
    }, 1000);
  };

  return (
    <>
      {searchedAnimeList && (
        <>
          {searchedAnimeList.data.length > 0 ? (
            <ul className="search__results">
              {searchedAnimeList?.data.map((anime) => (
                <li
                  className="search__results--result"
                  onClick={() => openAnime(anime.mal_id)}
                  key={anime.mal_id}
                >
                  <div className="search__results--result-padding">
                    <figure className="search__results--result-image">
                      <img src={anime.images.jpg.large_image_url} alt="" />
                    </figure>
                    <div className="search__results--result-data">
                      <div className="search__results--result-data-title">
                        <h1>{anime.title}</h1>
                      </div>
                      <div className="search__results--result-data-desc">
                        <p>{anime.synopsis}</p>
                      </div>
                      <ul className="search__results--result-data-genres">
                        {anime.genres.map((genre) => (
                          <li
                            className="search__results--result-data-genres-genre"
                            key={genre.mal_id}
                          >
                            <span>{genre.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search__no-result">
              <p>Nothing was found</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchData;
