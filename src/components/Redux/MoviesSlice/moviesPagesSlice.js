import { TMDB_AUTH } from "../../../api/tmdb";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getonepagemovies = createAsyncThunk(
  "/onepagemovies",
  async (pagenum, thankapi) => {
    const { rejectWithValue } = thankapi;
    try {
      const config = {
        method: "get",
        headers: {
          Authorization:
            TMDB_AUTH,
          accept: "application/json",
        },
      };

      const req = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pagenum}&sort_by=popularity.desc`,
        config
      );

      if (req.ok == false) {
        throw new Error("Failed to fetch movies");
      }

      const res = await req.json();

      return res.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  onepagemovies: [],
  onepagemoviesloading: true,
  onepagemoviesfailedrequest: "",
};
const moviesSlice = createSlice({
  name: "moviesslice",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getonepagemovies.pending, (state) => {
      state.onepagemoviesloading = true;
    });
    builder.addCase(getonepagemovies.fulfilled, (state, action) => {
      state.onepagemoviesloading = false;

      state.onepagemovies = action.payload;
    });
    builder.addCase(getonepagemovies.rejected, (state, action) => {
      state.onepagemoviesloading = false;

      state.onepagemoviesfailedrequest = action.payload;

      console.log(action);
    });
  },
});

export const onepagmoviesapi = moviesSlice.reducer;
