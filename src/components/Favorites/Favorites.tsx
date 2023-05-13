import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Favorite from "./Favorite";

interface IFavoritesProps {}

const Favorites: React.FunctionComponent<IFavoritesProps> = (props) => {
  const favorites = useSelector(
    (state: RootState) => state.favoritesReducer.favorites
  );

  return (
    <div className="row anime-list">
      <div className="favorites__wrapper anime-list__wrapper">
        {favorites.length > 0 &&
          favorites.map((anime) => <Favorite anime={anime} key={anime.mal_id}/>)}
      </div>
      {favorites.length === 0 && (
        <div className="favorites__no-result">
          <div className="favorites__no-result--background">
            <p>Nothing was found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
