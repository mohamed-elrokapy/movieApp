import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { fetchMovies } from "../../Redux/MoviesSlice/moviesSlice";
import { fetchTvShows } from "../../Redux/SeriesSlice/seriesSlice";
import { hasTmdbToken, tmdbImage } from "../../../api/tmdb";
import { yearOf } from "../../../utils/format";
import Rail from "../../ui/Rail";
import PosterGrid, { PosterGridSkeleton } from "../../ui/PosterGrid";

const movieItem = (m) => ({
  id: m.id,
  to: `/movie/${m.id}`,
  title: m.title,
  posterPath: m.poster_path,
  rating: m.vote_average,
  date: m.release_date,
});

const tvItem = (s) => ({
  id: s.id,
  to: `/series/${s.id}`,
  title: s.name,
  posterPath: s.poster_path,
  rating: s.vote_average,
  date: s.first_air_date,
});

function Featured({ movie }) {
  const backdrop = tmdbImage(movie.backdrop_path, "w1280");
  return (
    <section
      aria-label="Featured movie"
      className="relative isolate overflow-hidden border-b border-line"
    >
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-top opacity-60"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20 md:bg-gradient-to-r md:from-ink md:via-ink/70 md:to-transparent"
      />
      <div className="container-page flex min-h-[420px] flex-col justify-end py-10 md:min-h-[520px] md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Now playing
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-gray-50 sm:text-5xl lg:text-6xl">
          {movie.title}
        </h1>
        <p className="mt-3 flex items-center gap-3 text-sm text-gray-300">
          {Number(movie.vote_average) > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold text-accent">
              <FaStar aria-hidden="true" className="h-4 w-4" />
              {Number(movie.vote_average).toFixed(1)}
            </span>
          )}
          <span>{yearOf(movie.release_date)}</span>
        </p>
        <p className="mt-4 line-clamp-3 max-w-2xl text-gray-200">
          {movie.overview}
        </p>
        <div className="mt-6">
          <Link to={`/movie/${movie.id}`} className="btn-primary">
            View details
          </Link>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const series = useSelector((state) => state.series);

  const loadMovies = () => dispatch(fetchMovies());
  const loadSeries = () => dispatch(fetchTvShows());

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTvShows());
  }, [dispatch]);

  const moviesLoading = movies.loading || (!movies.loaded && !movies.error);
  const seriesLoading = series.status === "loading" || series.status === "idle";
  const highlyRated = movies.movies
    .filter((m) => m.vote_average > 7)
    .slice(0, 12);
  const featured = movies.movies.find((m) => m.backdrop_path);

  return (
    <div>
      {featured ? (
        <Featured movie={featured} />
      ) : (
        <section className="border-b border-line">
          <div className="container-page py-16 md:py-24">
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-gray-50 sm:text-5xl lg:text-6xl">
              Browse movies and series
            </h1>
            <p className="mt-4 max-w-xl text-gray-300">
              Search the catalogue, open a title for cast, reviews, trailers and
              recommendations.
            </p>
            {!hasTmdbToken && (
              <p
                role="note"
                className="mt-6 max-w-xl rounded-lg border border-line bg-surface p-4 text-sm text-gray-300"
              >
                No TMDB token is configured. Copy <code>.env.example</code> to{" "}
                <code>.env</code> and set <code>VITE_TMDB_TOKEN</code> to load
                live data.
              </p>
            )}
          </div>
        </section>
      )}

      <div className="container-page">
        <Rail
          title="Now playing"
          items={movies.movies.map(movieItem)}
          loading={moviesLoading && !movies.error}
          error={movies.error}
          onRetry={loadMovies}
          seeAll={
            <Link to="/movies" className="text-sm font-semibold text-accent hover:text-accent-soft">
              Browse all movies
            </Link>
          }
        />

        <Rail
          title="Airing today"
          items={series.tvShows.map(tvItem)}
          loading={seriesLoading}
          error={series.status === "error"}
          onRetry={loadSeries}
          seeAll={
            <Link to="/series" className="text-sm font-semibold text-accent hover:text-accent-soft">
              Browse all series
            </Link>
          }
        />

        {!movies.error && (
          <section aria-label="Highly rated now playing" className="py-6">
            <h2 className="mb-4 font-display text-2xl font-semibold text-gray-50 sm:text-3xl">
              Highly rated now playing
            </h2>
            {moviesLoading ? (
              <PosterGridSkeleton count={6} />
            ) : highlyRated.length > 0 ? (
              <PosterGrid items={highlyRated.map(movieItem)} />
            ) : (
              <p className="text-sm text-gray-400">
                Nothing in the current list is rated above 7.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
