import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Ioption {
  name: string;
  id: string;
  link: string;
}

interface IinitialState {
  options: Ioption[];
}

const initialState: IinitialState = {
  options: [
    {
      name: "Current Season",
      id: "currentSeason",
      link: "/",
    },
    {
      name: "Top Anime",
      id: "topAnime",
      link: "/top-anime",
    },
  ],
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeOption: (state: IinitialState, action: PayloadAction<string>) => {
      state.options = state.options.map((optionItem) => ({
        ...optionItem,
        checked: optionItem.id === action.payload ? true : false,
      }));
    },
  },
});

export const { changeOption } = optionsSlice.actions;
export default optionsSlice.reducer;
