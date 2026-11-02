import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesRecommendations } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import Rail from "../../../ui/Rail";

const Recommendations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recommendations, recommendationsLoading, recommendationsError } =
    useSelector((state) => state.SeriesDetails);

  useEffect(() => {
    if (id) dispatch(getSeriesRecommendations(id));
  }, [id, dispatch]);

  if (!recommendationsLoading && !recommendationsError && !recommendations?.length) {
    return null;
  }

  const items = (recommendations ?? []).slice(0, 12).map((s) => ({
    id: s.id,
    to: `/series/${s.id}`,
    title: s.name,
    posterPath: s.poster_path,
    rating: s.vote_average,
    date: s.first_air_date,
  }));

  return (
    <Rail
      title="Recommendations"
      items={items}
      loading={recommendationsLoading}
      error={recommendationsError}
    />
  );
};

export default Recommendations;
