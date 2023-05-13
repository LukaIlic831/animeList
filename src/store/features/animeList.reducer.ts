import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAnimeList } from "../../types";
import { firstAnimeList } from "../../data";

interface IinitialState {
  currentSeason: IAnimeList;
  topAnime: IAnimeList;
  isLoading: boolean;
  hasError: boolean;
  page: number;
}

interface objectType {
  url: string;
  page: number;
}

const initialState: IinitialState = {
  currentSeason: firstAnimeList,
  topAnime: firstAnimeList,
  isLoading: true,
  hasError: false,
  page: 0,
};

export const getCurrentSeason = createAsyncThunk(
  "animeList/getCurrentSeason",
  async (data: objectType): Promise<[IAnimeList, number]> => {
    try {
      const response = await axios
        .get<IAnimeList>(data.url)
        .then((response) => response.data);
      return [response, data.page];
    } catch (error) {
      console.log(error);
    }
    return [initialState.currentSeason, data.page];
  }
);

export const getTopAnime = createAsyncThunk(
  "animeList/getTopAnime",
  async (data: objectType): Promise<[IAnimeList, number]> => {
    try {
      const response = await axios
        .get<IAnimeList>(data.url)
        .then((response) => response.data);
      return [response, data.page];
    } catch (error) {
      console.log(error);
    }
    return [initialState.topAnime, data.page];
  }
);

export const animeListSlice = createSlice({
  name: "animeList",
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<{ filterChanged: boolean }>) => {
      if (!action.payload.filterChanged) {
        state.page === 0
          ? (state.page = state.page + 2)
          : (state.page = state.page + 1);
      } else {
        state.page = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCurrentSeason.fulfilled,
        (state, action: PayloadAction<[IAnimeList, number]>) => {
          if (action.payload[1] !== 1) {
            state.currentSeason.data = [
              ...state.currentSeason.data,
              ...action.payload[0].data,
            ];
            state.currentSeason.pagination = action.payload[0].pagination;
          } else {
            state.currentSeason = action.payload[0];
          }
          state.hasError = false;
          state.isLoading = false;
        }
      )
      .addCase(getCurrentSeason.pending, (state) => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(getCurrentSeason.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(
        getTopAnime.fulfilled,
        (state, action: PayloadAction<[IAnimeList, number]>) => {
          if (action.payload[1] !== 1) {
            state.topAnime.data = [
              ...state.topAnime.data,
              ...action.payload[0].data,
            ];
            state.currentSeason.pagination = action.payload[0].pagination;
          } else {
            state.topAnime = action.payload[0];
          }
          state.hasError = false;
          state.isLoading = false;
        }
      )
      .addCase(getTopAnime.pending, (state) => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(getTopAnime.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const { updatePage } = animeListSlice.actions;

export default animeListSlice.reducer;
