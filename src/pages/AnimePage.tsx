import * as React from "react";
import Nav from "../components/Nav";
import HomeSection from "../components/Home/HomeSection";
import Anime from "../components/Anime/Anime";

interface IAnimePageProps {}

const AnimePage: React.FunctionComponent<IAnimePageProps> = (props) => {
  return (
    <>
      <Nav bookmarkPage={false} favoritesPage={false} />
      <HomeSection checkedOption=""/>
      <Anime/>
    </>
  );
};

export default AnimePage;
