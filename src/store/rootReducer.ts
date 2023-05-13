import { combineReducers } from "redux";
import animeListReducer from "./features/animeList.reducer";
import optionsReducer from "./features/options.reducer";
import bookmarksReducer from "./features/bookmarks.reducer";
import favoritesReducer from "./features/favorites.reducer";
import searchedAnimeReducer from "./features/searchedAnime.reducer";

const rootReducer = combineReducers({
  animeListReducer,
  optionsReducer,
  bookmarksReducer,
  favoritesReducer,
  searchedAnimeReducer
});

export default rootReducer;
