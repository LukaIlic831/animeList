import * as React from "react";
import Nav from "../components/Nav";
import HomeSection from "../components/Home/HomeSection";
import AnimeList from "../components/Home/CurrentSeason";
import Search from "../components/Search/Search";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
  return (
    <>
      <Nav bookmarkPage={false} favoritesPage={false}/>
      <HomeSection checkedOption="Current Season" />
      <AnimeList />
    </>
  );
};

export default Home;
