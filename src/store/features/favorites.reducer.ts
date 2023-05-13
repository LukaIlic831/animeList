import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAnime } from "../../types";

interface IinitialState {
  favorites: IAnime[];
}

const initialState: IinitialState = { favorites: [] };

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IAnime>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (favorites) => favorites.mal_id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
