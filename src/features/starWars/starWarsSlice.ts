import { createSlice } from "@reduxjs/toolkit";

import { fetchStarWarsData } from "./services";
import type { StarWarsState } from "./types";

const initialState: StarWarsState = {
  data: [],
  loading: false,
  error: null,
};

const starWarsSlice = createSlice({
  name: "starWars",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStarWarsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStarWarsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStarWarsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default starWarsSlice.reducer;
