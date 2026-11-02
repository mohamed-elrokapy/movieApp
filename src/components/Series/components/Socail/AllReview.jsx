import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesReviews } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import SeriesPageShell from "../../../ui/SeriesPageShell";
import ReviewCard from "../../../Movies/components/ReviewCard";

const AllReview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seriesReviews, seriesReviewsLoading, seriesReviewsError } =
    useSelector((state) => state.SeriesDetails);

  useEffect(() => {
    dispatch(getSeriesReviews(id));
  }, [dispatch, id]);

  const list = seriesReviews?.results ?? [];

  return (
    <SeriesPageShell id={id}>
      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-2xl font-semibold text-gray-50">
          Reviews <span className="text-accent">{list.length}</span>
        </h2>
        {seriesReviewsLoading ? (
          <div className="skeleton h-28 rounded-lg" role="status" aria-label="Loading reviews" />
        ) : seriesReviewsError ? (
          <p className="text-gray-400">Reviews could not be loaded.</p>
        ) : list.length === 0 ? (
          <p className="text-gray-400">No reviews yet.</p>
        ) : (
          list.map((r) => <ReviewCard key={r.id} all MovieReviews={r} />)
        )}
      </div>
    </SeriesPageShell>
  );
};

export default AllReview;
