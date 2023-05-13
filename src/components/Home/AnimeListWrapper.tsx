import * as React from "react";
import AnimeComponent from "./Anime Component/AnimeComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getCurrentSeason,
  getTopAnime,
  updatePage,
} from "../../store/features/animeList.reducer";
import { AppContext } from "../../App";
import { IAppContext } from "../../types";

interface IAnimeListWrapperProps {
  checkedOption: string;
}

const AnimeListWrapper: React.FunctionComponent<IAnimeListWrapperProps> = (
  props
) => {
  const { setFilterChangedSkel, filterText } = React.useContext(
    AppContext
  ) as IAppContext;
  const dispatch = useDispatch<AppDispatch>();
  const animeList = useSelector((state: RootState) =>
    props.checkedOption === "Current Season"
      ? state.animeListReducer.currentSeason
      : state.animeListReducer.topAnime
  );
  const page = useSelector((state: RootState) => state.animeListReducer.page);
  const stopObserver = React.useRef<null | boolean>(false);
  const loader = React.useRef<null | HTMLDivElement>(null);

  // intersectionObserver
  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        dispatch(updatePage({ filterChanged: false }));
        stopObserver.current && observer.disconnect();
      }
    },
    []
  );
  const observer = new IntersectionObserver(handleObserver, {
    threshold: 1,
  });

  React.useEffect(() => {
    observer.observe(loader.current as HTMLElement);
  }, []);

  React.useEffect(() => {
    if (animeList.pagination.has_next_page || page === 1) {
      props.checkedOption === "Current Season"
        ? dispatch(
            getCurrentSeason({
              url: `https://api.jikan.moe/v4/seasons/now?page=${
                page === 0 ? 1 : page
              }`,
              page: page === 0 ? 1 : page,
            })
          )
        : dispatch(
            getTopAnime({
              url: `https://api.jikan.moe/v4/top/anime?page=${
                page === 0 ? 1 : page
              }&type=${filterText !== "Filter by Type" ? filterText : null}`,
              page: page === 0 ? 1 : page,
            })
          ).then(() => setFilterChangedSkel(false));
    }
    animeList.pagination.last_visible_page - 1 === page &&
      (stopObserver.current = true);
  }, [page, filterText]);

  return (
    <>
      <div className="anime-list__wrapper">
        {animeList.data.map((anime) => (
          <AnimeComponent anime={anime} checkedOption={props.checkedOption} key={anime.mal_id}/>
        ))}
      </div>
      {animeList.pagination.has_next_page ? (
        <div className="loader" ref={loader}>
          <div className="loader__background">
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="loader loader-end" ref={loader}>
          <div className="loader__background">
            <p>Nothing more to load</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeListWrapper;
