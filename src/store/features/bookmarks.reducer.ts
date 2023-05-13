import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAnime } from "../../types";

interface IinitialState {
  bookmarks: IAnime[];
}

const initialState: IinitialState = { bookmarks: [] };

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<IAnime>) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.mal_id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
