import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMoviebySearch } from "../../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import { getSeriesBySearch } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import Requesterror from "../../../apiRequestError-Loading/Requesterror";
import PageHeader from "../../../ui/PageHeader";
import PosterGrid, { PosterGridSkeleton } from "../../../ui/PosterGrid";
import NotFound from "../../../../NotFound";

const SearchResults = () => {
  // react-router already decodes route params.
  const { type, query } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({ status: "loading", results: [] });

  const isMovies = type === "movies";
  const valid = isMovies || type === "series";

  const load = useCallback(async () => {
    setState({ status: "loading", results: [] });
    try {
      const thunk = isMovies ? getMoviebySearch : getSeriesBySearch;
      const results = await dispatch(thunk(query)).unwrap();
      setState({ status: "done", results: results ?? [] });
    } catch {
      setState({ status: "error", results: [] });
    }
  }, [dispatch, isMovies, query]);

  useEffect(() => {
    if (valid) load();
  }, [valid, load]);

  if (!valid) return <NotFound />;

  const items = state.results.map((r) => ({
    id: r.id,
    to: `/${isMovies ? "movie" : "series"}/${r.id}`,
    title: r.title || r.name,
    posterPath: r.poster_path,
    rating: r.vote_average,
    date: r.release_date || r.first_air_date,
  }));

  return (
    <div>
      <PageHeader kicker={`Search ${type}`} title={`Results for "${query}"`} />
      <div className="container-page pb-8">
        {state.status === "loading" && <PosterGridSkeleton count={12} />}
        {state.status === "error" && (
          <Requesterror
            title="Search failed"
            message="The search request failed. Try again in a moment."
            onRetry={load}
          />
        )}
        {state.status === "done" &&
          (items.length > 0 ? (
            <PosterGrid items={items} label="Search results" />
          ) : (
            <p className="py-10 text-gray-400">
              No {type} matched &ldquo;{query}&rdquo;.
            </p>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
