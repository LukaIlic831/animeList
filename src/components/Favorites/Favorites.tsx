import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Favorite from "./Favorite";
import { motion } from "framer-motion";

interface IFavoritesProps {}

const animeListVariants = {
  initial: {
    opacity: 0,
    y: "60vh",
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
  exit: {
    y: "60vh",
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

const Favorites: React.FunctionComponent<IFavoritesProps> = (props) => {
  const favorites = useSelector(
    (state: RootState) => state.favoritesReducer.favorites
  );

  return (
    <motion.div
      className="row anime-list"
      variants={animeListVariants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <div className="favorites__wrapper anime-list__wrapper">
        {favorites.length > 0 &&
          favorites.map((anime) => (
            <Favorite anime={anime} key={anime.mal_id} />
          ))}
      </div>
      {favorites.length === 0 && (
        <div className="favorites__no-result">
          <div className="favorites__no-result--background">
            <p>Nothing was found</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Favorites;
