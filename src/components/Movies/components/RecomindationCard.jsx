import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieRecommendatios } from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import Rail from "../../ui/Rail";

export default function RecomindationCard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieRecommendations } = useSelector(
    (state) => state.onemoviedetails
  );

  useEffect(() => {
    dispatch(getMovieRecommendatios(id));
  }, [id, dispatch]);

  if (!movieRecommendations?.length) return null;

  const items = movieRecommendations.map((m) => ({
    id: m.id,
    to: `/movie/${m.id}`,
    title: m.title,
    posterPath: m.poster_path,
    rating: m.vote_average,
    date: m.release_date,
  }));

  return <Rail title="Recommendations" items={items} />;
}
