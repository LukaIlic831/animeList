import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Bookmark from "./Bookmark";

interface IBookmarksProps {}

const Bookmarks: React.FunctionComponent<IBookmarksProps> = (props) => {
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarksReducer.bookmarks
  );
  return (
    <div className="row anime-list">
      <div className="bookmarks__wrapper anime-list__wrapper">
        {bookmarks.length > 0 &&
          bookmarks.map((anime) => <Bookmark anime={anime} key={anime.mal_id}/>)}
      </div>
      {bookmarks.length === 0 && (
        <div className="bookmarks__no-result">
          <div className="bookmarks__no-result--background">
            <p>Nothing was found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
