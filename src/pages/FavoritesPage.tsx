import * as React from "react";
import FavoritesSection from "../components/Favorites/FavoritesSection";
import Favorites from "../components/Favorites/Favorites";
import Nav from "../components/Nav";

interface IFavoritesPageProps {}

const FavoritesPage: React.FunctionComponent<IFavoritesPageProps> = (props) => {
  return (
    <>
      <Nav bookmarkPage={false} favoritesPage={true}/>
      <FavoritesSection />
      <Favorites />
    </>
  );
};

export default FavoritesPage;
