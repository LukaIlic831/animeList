import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { addBookmark } from "../../store/features/bookmarks.reducer";
import { addFavorite } from "../../store/features/favorites.reducer";
import axios from "axios";
import { IAnime } from "../../types";

interface IAnimeNew {
  data: IAnime;
}

interface IAnimeProps {}

const Anime: React.FunctionComponent<IAnimeProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [anime, setAnime] = React.useState<IAnime | null>(null);
  const [animeLoading, setAnimeLoading] = React.useState<boolean>(false);
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarksReducer.bookmarks
  );
  const favorites = useSelector(
    (state: RootState) => state.favoritesReducer.favorites
  );

  const findBookmark = (id: number): boolean => {
    return Boolean(bookmarks.find((bookmark) => bookmark.mal_id === id));
  };

  const findFavorite = (id: number): boolean => {
    return Boolean(favorites.find((favorite) => favorite.mal_id === id));
  };

  const getAnimeById = async (url: string): Promise<void> => {
    try {
      setAnimeLoading(true);
      const response = await axios
        .get<IAnimeNew>(url)
        .then((response) => response.data);
      setAnime(response.data);
      setAnimeLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAnimeById(`https://api.jikan.moe/v4/anime/${id}`);
  }, [id]);

  return (
    <div className="clicked-anime__wrapper">
      <div className="clicked-anime__block">
        {!animeLoading && anime ? (
          <div className="clicked-anime">
            <figure className="clicked-anime__img">
              <img src={anime.images.jpg.large_image_url} alt="" />
            </figure>
            <div className="clicked-anime__text">
              <div className="clicked-anime__text--info">
                <p>
                  <span>
                    {anime.type} ● {anime.rating}
                  </span>
                </p>
              </div>
              <div className="clicked-anime__text--title">
                <h1>{anime.title}</h1>
              </div>
              <ul className="clicked-anime__text--genres">
                {anime.genres.map((genre) => (
                  <li
                    className="clicked-anime__text--genres-genre"
                    key={genre.mal_id}
                  >
                    <span>{genre.name}</span>
                  </li>
                ))}
              </ul>
              <div className="clicked-anime__text--status">
                <p className="clicked-anime__text--status-title">Status</p>
                <span
                  style={
                    anime.status === "Finished Airing"
                      ? { backgroundColor: "#cc2323" }
                      : { backgroundColor: "#059669" }
                  }
                >
                  {anime.status}
                </span>
              </div>
              <div className="clicked-anime__text--buttons">
                <button
                  className="clicked-anime__text--buttons-button"
                  onClick={() => dispatch(addFavorite(anime))}
                  disabled={findFavorite(anime.mal_id) ? true : false}
                  style={
                    findFavorite(anime.mal_id)
                      ? { backgroundColor: "#1d4ed8" }
                      : undefined
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={findFavorite(anime.mal_id) ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    ></path>
                  </svg>
                  {findFavorite(anime.mal_id) ? (
                    <p>Added</p>
                  ) : (
                    <p>Add to favorites</p>
                  )}
                </button>
                <button
                  className="clicked-anime__text--buttons-button"
                  onClick={() => dispatch(addBookmark(anime))}
                  disabled={findBookmark(anime.mal_id) ? true : false}
                  style={
                    findBookmark(anime.mal_id)
                      ? { backgroundColor: "#1d4ed8" }
                      : undefined
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={findBookmark(anime.mal_id) ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    aria-hidden="true"
                    className="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                  {findBookmark(anime.mal_id) ? (
                    <p>Bookmarked</p>
                  ) : (
                    <p>Bookmark this!</p>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="skeleton-anime">
            <figure className="skeleton-anime__img">
              <img src="" alt="" />
            </figure>
            <div className="skeleton-anime__text">
              <div className="skeleton-anime__text--info"></div>
              <div className="skeleton-anime__text--title"></div>
              <ul className="skeleton-anime__text--genres">
                <li className="skeleton-anime__text--genres-genre">
                  <span></span>
                </li>
                <li className="skeleton-anime__text--genres-genre">
                  <span></span>
                </li>
                <li className="skeleton-anime__text--genres-genre">
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="clicked-anime__text-block">
        <div className="clicked-anime__para">
          <div className="clicked-anime__para--title">
            <h2>Synopsis</h2>
          </div>
          {anime ? (
            <div className="clicked-anime__para--desc">
              {anime.synopsis ? (
                <p>{anime.synopsis}</p>
              ) : (
                <p>Nothing was found</p>
              )}
            </div>
          ) : (
            <div className="skeleton-anime__para--desc"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anime;
