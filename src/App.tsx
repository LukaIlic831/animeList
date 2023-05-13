import * as React from "react";
import Home from "./pages/Home";
import { Provider } from "react-redux/es/exports";
import store from "./store/store";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TopAnimePage from "./pages/TopAnimePage";
import BookmarksPage from "./pages/BookmarksPage";
import FavoritesPage from "./pages/FavoritesPage";
import AnimePage from "./pages/AnimePage";
import Search from "./components/Search/Search";
import { IAppContext } from "./types";

export const AppContext = React.createContext<IAppContext | null>(null);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/top-anime" element={<TopAnimePage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/anime/:id" element={<AnimePage />} />
    </Routes>
  );
}

const AppWrapper: React.FunctionComponent = () => {
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [filterChangedSkel, setFilterChangedSkel] = React.useState(false);
  const [filterText, setFilterText] = React.useState("Filter by Type");
  return (
    <Provider store={store}>
      <Router>
        <AppContext.Provider
          value={{
            searchOpened,
            setSearchOpened,
            filterChangedSkel,
            setFilterChangedSkel,
            filterText,
            setFilterText,
          }}
        >
          {searchOpened && <Search setSearchOpened={setSearchOpened} />}
          <App />
        </AppContext.Provider>
      </Router>
    </Provider>
  );
};

export default AppWrapper;
