import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSeriesReviews } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import ReviewCard from "../../../Movies/components/ReviewCard";
import Section from "../../../ui/Section";

const Social = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.SeriesDetails.seriesReviews);
  const loading = useSelector((state) => state.SeriesDetails.seriesReviewsLoading);
  const error = useSelector((state) => state.SeriesDetails.seriesReviewsError);

  useEffect(() => {
    if (id) dispatch(getSeriesReviews(id));
  }, [dispatch, id]);

  const list = reviews?.results ?? [];

  return (
    <Section title={`Reviews${loading ? "" : ` (${list.length})`}`}>
      {loading ? (
        <div className="skeleton h-28 rounded-lg" role="status" aria-label="Loading reviews" />
      ) : error ? (
        <p className="text-sm text-gray-400">Reviews could not be loaded.</p>
      ) : list.length > 0 ? (
        <>
          <ReviewCard MovieReviews={list[0]} all={false} />
          {list.length > 1 && (
            <Link
              to={`/tv/${id}/reviews`}
              className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
            >
              Read all reviews &rarr;
            </Link>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-400">No reviews available for this series.</p>
      )}
    </Section>
  );
};

export default Social;
