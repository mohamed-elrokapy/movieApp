import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieKeywords } from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";

const MovieKeywords = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieKeywords } = useSelector((state) => state.onemoviedetails);

  useEffect(() => {
    dispatch(getMovieKeywords(id));
  }, [id, dispatch]);

  if (!movieKeywords?.length) {
    return <p className="text-sm text-gray-400">No keywords available.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {movieKeywords.map((keyword) => (
        <li
          key={keyword.id}
          className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-gray-200"
        >
          {keyword.name}
        </li>
      ))}
    </ul>
  );
};

export default MovieKeywords;
