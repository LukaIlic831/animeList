import * as React from "react";
import Nav from "../components/Nav";
import BookmarksSection from "../components/Bookmarks/BookmarksSection";
import Bookmarks from "../components/Bookmarks/Bookmarks";

interface IBookmarksPageProps {}

const BookmarksPage: React.FunctionComponent<IBookmarksPageProps> = (props) => {
  return (
    <>
      <Nav bookmarkPage={true}  favoritesPage={false}/>
      <BookmarksSection />
      <Bookmarks />
    </>
  );
};

export default BookmarksPage;
