import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAnimeList } from "../../types";
import { firstAnimeList } from "../../data";
import axios from "axios";

interface IinitialState {
  animeList: IAnimeList | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IinitialState = {
  animeList: null,
  isLoading: false,
  hasError: false,
};

export const searchAnime = createAsyncThunk(
  "searchedAnime/searchAnime",
  async (url: string): Promise<IAnimeList | null> => {
    try {
      const response = await axios
        .get<IAnimeList>(url)
        .then((response) => response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
    return initialState.animeList;
  }
);

const searchedAnimeSlice = createSlice({
  name: "searchedAnime",
  initialState,
  reducers: {
    emptyState: (state) => {
      state.animeList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        searchAnime.fulfilled,
        (state, action: PayloadAction<IAnimeList | null>) => {
          state.animeList = action.payload;
          state.hasError = false;
          state.isLoading = false;
        }
      )
      .addCase(searchAnime.pending, (state) => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(searchAnime.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});
export const { emptyState } = searchedAnimeSlice.actions;
export default searchedAnimeSlice.reducer;
