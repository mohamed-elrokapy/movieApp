import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMoviecollection } from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import PageHeader from "../../ui/PageHeader";
import PosterGrid from "../../ui/PosterGrid";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import Loading from "../../apiRequestError-Loading/Loading";
import { HiArrowLeft } from "react-icons/hi2";

const MovieCollectionPage = () => {
  const { id, movieId } = useParams();
  const dispatch = useDispatch();
  const { movieCollection, movieCollectionLoading, movieCollectionError } =
    useSelector((state) => state.onemoviedetails);

  const load = () => dispatch(getMoviecollection(id));

  useEffect(() => {
    dispatch(getMoviecollection(id));
  }, [id, dispatch]);

  if (movieCollectionError) {
    return <Requesterror title="Could not load this collection" onRetry={load} />;
  }
  if (movieCollectionLoading || String(movieCollection?.id) !== String(id)) {
    return <Loading />;
  }

  const items = (movieCollection.parts ?? []).map((p) => ({
    id: p.id,
    to: `/movie/${p.id}`,
    title: p.title,
    posterPath: p.poster_path,
    rating: p.vote_average,
    date: p.release_date,
  }));

  return (
    <div>
      <PageHeader kicker="Collection" title={movieCollection.name}>
        {movieCollection.overview && (
          <p className="mt-3 max-w-3xl text-gray-300">{movieCollection.overview}</p>
        )}
        <Link
          to={`/movie/${movieId}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft"
        >
          <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to the movie
        </Link>
      </PageHeader>
      <div className="container-page pb-8">
        <PosterGrid items={items} label="Movies in this collection" />
      </div>
    </div>
  );
};

export default MovieCollectionPage;
