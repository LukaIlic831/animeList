import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Bookmark from "./Bookmark";
import { motion } from "framer-motion";

interface IBookmarksProps {}

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

const Bookmarks: React.FunctionComponent<IBookmarksProps> = (props) => {
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarksReducer.bookmarks
  );
  return (
    <motion.div
      className="row anime-list"
      variants={animeListVariants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <div className="bookmarks__wrapper anime-list__wrapper">
        {bookmarks.length > 0 &&
          bookmarks.map((anime) => (
            <Bookmark anime={anime} key={anime.mal_id} />
          ))}
      </div>
      {bookmarks.length === 0 && (
        <div className="bookmarks__no-result">
          <div className="bookmarks__no-result--background">
            <p>Nothing was found</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Bookmarks;
