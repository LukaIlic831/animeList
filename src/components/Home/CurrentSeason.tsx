import React from "react";
import SectionSubTitle from "./SectionSubTitle";
import AnimeListWrapper from "./AnimeListWrapper";

interface ICurrentSeasonProps {}

const CurrentSeason: React.FunctionComponent<ICurrentSeasonProps> = (props) => {

  return (
    <div className="row anime-list">
      <SectionSubTitle subTitle="Current Season" />
      <AnimeListWrapper checkedOption="Current Season"/>
    </div>
  );
};

export default CurrentSeason;
