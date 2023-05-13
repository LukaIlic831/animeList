import * as React from "react";

interface IFavoritesSectionProps {}

const FavoritesSection: React.FunctionComponent<IFavoritesSectionProps> = (
  props
) => {
  return (
    <div className="section section__wrapper">
      <span className="section__title">Favorites</span>
    </div>
  );
};

export default FavoritesSection;
