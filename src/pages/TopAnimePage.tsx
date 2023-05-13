import * as React from "react";
import Nav from "../components/Nav";
import TopAnime from "../components/Home/TopAnime";
import HomeSection from "../components/Home/HomeSection";

interface ITopAnimePageProps {}

const TopAnimePage: React.FunctionComponent<ITopAnimePageProps> = (props) => {
  return (
    <>
      <Nav bookmarkPage={false}  favoritesPage={false}/>
      <HomeSection checkedOption="Top Anime"/>
      <TopAnime />
    </>
  );
};

export default TopAnimePage;
