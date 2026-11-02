import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMoviecollection } from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";

const MovieCollection = ({ collectionId, movieId }) => {
  const dispatch = useDispatch();
  const { movieCollection } = useSelector((state) => state.onemoviedetails);

  useEffect(() => {
    dispatch(getMoviecollection(collectionId));
  }, [collectionId, dispatch]);

  if (!movieCollection?.name) return null;

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Part of a collection
      </p>
      <h3 className="mt-1 font-display text-xl font-semibold text-gray-50">
        {movieCollection.name}
      </h3>
      {movieCollection.parts?.length > 0 && (
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-gray-300">
          {movieCollection.parts.map((part) => (
            <li key={part.id}>{part.title}</li>
          ))}
        </ol>
      )}
      <Link
        to={`/movie/${movieId}/collection/${collectionId}`}
        className="btn-ghost mt-4"
      >
        View the collection
      </Link>
    </div>
  );
};

export default MovieCollection;
