import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationFooter from "../../PaginationFooter/PaginationFooter";
import {
  next,
  prev,
  goToFirstPage,
  goToLastPage,
} from "../../Redux/MoviesSlice/footerPaginationmoviesSlice";
import { getonepagemovies } from "../../Redux/MoviesSlice/moviesPagesSlice";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import PageHeader from "../../ui/PageHeader";
import PosterGrid, { PosterGridSkeleton } from "../../ui/PosterGrid";

const Movies = () => {
  const dispatch = useDispatch();
  const { onepagemovies, onepagemoviesloading, onepagemoviesfailedrequest } =
    useSelector((state) => state.onepagmoviesapi);
  const page = useSelector((state) => state.footerPaginationmovies.moviesactive);

  const load = () => dispatch(getonepagemovies(page));

  useEffect(() => {
    dispatch(getonepagemovies(page));
  }, [page, dispatch]);

  const items = (onepagemovies ?? []).map((m) => ({
    id: m.id,
    to: `/movie/${m.id}`,
    title: m.title,
    posterPath: m.poster_path,
    rating: m.vote_average,
    date: m.release_date,
  }));

  return (
    <div>
      <PageHeader kicker="Popular" title="Movies" />
      <div className="container-page">
        {onepagemoviesfailedrequest ? (
          <Requesterror
            title="Could not load movies"
            message="The movie list request failed. Check your connection or API token and try again."
            onRetry={load}
          />
        ) : onepagemoviesloading ? (
          <PosterGridSkeleton count={18} />
        ) : items.length > 0 ? (
          <PosterGrid items={items} label="Popular movies" />
        ) : (
          <p className="py-10 text-gray-400">No movies found on this page.</p>
        )}
      </div>

      <PaginationFooter
        next={next}
        prev={prev}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        page={page}
      />
    </div>
  );
};

export default Movies;
