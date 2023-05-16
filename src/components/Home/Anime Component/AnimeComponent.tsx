import React, { useState, useEffect, useRef } from "react";
import { IAnime, IAppContext } from "../../../types";
import Skeleton from "../Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addBookmark } from "../../../store/features/bookmarks.reducer";
import { addFavorite } from "../../../store/features/favorites.reducer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { motion } from "framer-motion";

interface IAnimeComponentProps {
  anime: IAnime;
  checkedOption: string;
}

const pathVariants = {
  initial: {
    opacity: 0,
    pathLength: 0,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const AnimeComponent: React.FunctionComponent<IAnimeComponentProps> = (
  props
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.animeListReducer.isLoading
  );
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarksReducer.bookmarks
  );
  const favorites = useSelector(
    (state: RootState) => state.favoritesReducer.favorites
  );
  const { filterChangedSkel } = React.useContext(AppContext) as IAppContext;
  const [img, setImg] = useState<HTMLImageElement>();
  const mountedRef = useRef<boolean>(true);

  const findBookmark = (id: number): boolean => {
    return Boolean(bookmarks.find((bookmark) => bookmark.mal_id === id));
  };

  const findFavorite = (id: number): boolean => {
    return Boolean(favorites.find((favorite) => favorite.mal_id === id));
  };

  useEffect(() => {
    mountedRef.current = true;
    const image: HTMLImageElement = new Image();
    image.src = props.anime.images.jpg.image_url;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 600);
    };
    return () => {
      mountedRef.current = false;
    };
  }, [isLoading]);

  return (
    <>
      {img && !filterChangedSkel ? (
        <div className="anime__block">
          <div className="anime">
            <figure className="anime__img">
              <img
                src={props.anime.images.jpg.large_image_url}
                onClick={() => navigate(`/anime/${props.anime.mal_id}`)}
              />
              <div className="anime__buttons">
                <button
                  className="anime__buttons--button"
                  onClick={() => dispatch(addFavorite(props.anime))}
                  disabled={findFavorite(props.anime.mal_id) ? true : false}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={findFavorite(props.anime.mal_id) ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="icon"
                  >
                    <motion.path
                      variants={pathVariants}
                      animate="animate"
                      initial="initial"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    ></motion.path>
                  </svg>
                  {findFavorite(props.anime.mal_id) ? (
                    <p>Added</p>
                  ) : (
                    <p>Add to favorites</p>
                  )}
                </button>
                <button
                  className="anime__buttons--button"
                  onClick={() => dispatch(addBookmark(props.anime))}
                  disabled={findBookmark(props.anime.mal_id) ? true : false}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={findBookmark(props.anime.mal_id) ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    aria-hidden="true"
                    className="icon"
                  >
                    <motion.path
                    variants={pathVariants}
                    animate="animate"
                    initial="initial"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></motion.path>
                  </svg>
                  {findBookmark(props.anime.mal_id) ? (
                    <p>Bookmarked</p>
                  ) : (
                    <p>Bookmark this!</p>
                  )}
                </button>
              </div>
            </figure>
            <div className="anime__title">
              <p>{props.anime.title}</p>
            </div>
            <div className="anime__info">
              <span>
                {props.anime.season} · {props.anime.status}
              </span>
              {props.checkedOption === "Top Anime" && (
                <span>Rank: {props.anime.rank}</span>
              )}
            </div>
            <ul className="anime__categories">
              {props.anime.genres.map((genre) => (
                <li className="anime__categories--category" key={genre.mal_id}>
                  <span>{genre.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Skeleton anime={props.anime} />
      )}
    </>
  );
};

export default AnimeComponent;
