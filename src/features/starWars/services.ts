import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { Person } from "./types";
import { BASE_URL } from "./constants";

export const fetchStarWarsData = createAsyncThunk(
  "starWars/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data.results as Person[];
    } catch (error: any) {
      if (!navigator.onLine) {
        return rejectWithValue("No internet connection");
      }
      return rejectWithValue(error.message);
    }
  },
);
