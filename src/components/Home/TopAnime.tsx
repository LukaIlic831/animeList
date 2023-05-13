import * as React from "react";
import SectionSubTitle from "./SectionSubTitle";
import AnimeListWrapper from "./AnimeListWrapper";

interface ITopAnimeProps {}

const TopAnime: React.FunctionComponent<ITopAnimeProps> = (props) => {
  return (
    <div className="row anime-list">
      <SectionSubTitle subTitle="Top Anime" />
      <AnimeListWrapper checkedOption="Top Anime" />
    </div>
  );
};

export default TopAnime;
