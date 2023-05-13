import * as React from "react";

interface IBookmarksSectionProps {}

const BookmarksSection: React.FunctionComponent<IBookmarksSectionProps> = (
  props
) => {
  return (
    <div className="section section__wrapper">
      <span className="section__title">Bookmarks</span>
    </div>
  );
};

export default BookmarksSection;
