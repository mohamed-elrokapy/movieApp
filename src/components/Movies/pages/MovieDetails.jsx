import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetails,
  getMovieCastDetails,
  getMovieTrialVideo,
  getMovieReviews,
} from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import DetailHero, { DetailHeroSkeleton } from "../../ui/DetailHero";
import { formatRuntime } from "../../../utils/format";
import CastRail from "../../ui/CastRail";
import Section from "../../ui/Section";
import ReviewCard from "../components/ReviewCard";
import RecomindationCard from "../components/RecomindationCard";
import Moviemedia from "../components/Moviemedia";
import Social from "../components/Social";
import MovieKeywords from "../components/MovieKeywords";
import MovieCollection from "../components/MovieCollection";

const names = (list, n = 3) => (list ?? []).slice(0, n).map((p) => p.name);

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const onemovie = useSelector((state) => state.onemoviedetails);
  const { movieDetails: movie, MovieReviews } = onemovie;

  const load = () => {
    dispatch(getMovieDetails(id));
    dispatch(getMovieCastDetails(id));
    dispatch(getMovieTrialVideo(id));
    dispatch(getMovieReviews(id));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (onemovie.movieDetailsError) {
    return (
      <Requesterror
        title="Could not load this movie"
        message="The movie details request failed. It may not exist, or the data service is unavailable."
        onRetry={load}
      />
    );
  }

  // Stale data from a previously opened movie counts as loading.
  if (onemovie.movieDetailsLoading || String(movie?.id) !== String(id)) {
    return <DetailHeroSkeleton />;
  }

  const crew = onemovie.moviecastDetails?.crew ?? [];
  const directors = crew.filter((c) => c.job === "Director");
  const year = movie.release_date?.slice(0, 4);

  return (
    <div>
      <DetailHero
        backdropPath={movie.backdrop_path}
        posterPath={movie.poster_path}
        title={movie.title}
        tagline={movie.tagline}
        facts={[
          year,
          formatRuntime(movie.runtime),
          movie.original_language?.toUpperCase(),
        ]}
        genres={(movie.genres ?? []).map((g) => g.name)}
        rating={movie.vote_average}
        voteCount={movie.vote_count}
        overview={movie.overview}
        credits={[
          { label: "Director", people: names(directors) },
          { label: "Starring", people: names(onemovie.moviecastDetails?.cast) },
        ]}
        trailerUrl={onemovie.movievideotrailerUrl}
      />

      <div className="container-page grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Section title="Top billed cast" className="pt-0">
            <CastRail
              people={onemovie.topbilledcast}
              personTo={(p) => `/person/${p.id}`}
              seeAllTo={`/movie/${movie.id}/cast_crew`}
              seeAllLabel="Full cast and crew"
            />
          </Section>

          <Section title={`Reviews (${MovieReviews.length})`}>
            <ReviewCard MovieReviews={MovieReviews[0]} all={false} />
            {MovieReviews.length > 1 && (
              <Link
                to={`/movie/${id}/movie_review`}
                className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
              >
                Read all reviews &rarr;
              </Link>
            )}
          </Section>

          <Section title="Media">
            <Moviemedia />
          </Section>

          {movie.belongs_to_collection && (
            <Section title="Collection">
              <MovieCollection
                movieId={id}
                collectionId={movie.belongs_to_collection.id}
              />
            </Section>
          )}

          <RecomindationCard />
        </div>

        <aside aria-label="Facts and keywords" className="space-y-8 lg:pt-1">
          <Social moviedetails={movie} />
          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-gray-50">
              Keywords
            </h2>
            <MovieKeywords />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MovieDetails;
