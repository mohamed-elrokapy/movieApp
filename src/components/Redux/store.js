import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./MoviesSlice/moviesSlice";
import seriesReducer from "./SeriesSlice/seriesSlice";
import { onepagmoviesapi } from "./MoviesSlice/moviesPagesSlice";
import { footerPaginationmovies } from "./MoviesSlice/footerPaginationmoviesSlice";
import { footerPaginationseries } from "./SeriesSlice/footerPaginationSeriesSlice";
import { onepageseriesapi } from "./SeriesSlice/seriesPagesSlice";
import { onemoviedetails } from "./DetailsMoviesSlice/movieDetailsSlice";
import { SeriesDetails } from "./DetailsSeriesSlice/DetailsSeriesSlice";
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    series: seriesReducer,
    onepagmoviesapi,
    footerPaginationmovies,
    footerPaginationseries,
    onepageseriesapi,
    onemoviedetails,
    SeriesDetails,
  },
});
