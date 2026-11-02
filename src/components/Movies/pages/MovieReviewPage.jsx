import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieReviews,
} from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import CastCrewPageHeader from "../components/CastCrewPageHeader";
import ReviewCard from "../components/ReviewCard";

const MovieReviewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, MovieReviews } = useSelector(
    (state) => state.onemoviedetails
  );

  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getMovieReviews(id));
  }, [id, dispatch]);

  const sameMovie = String(movieDetails?.id) === String(id);

  return (
    <div>
      <CastCrewPageHeader
        poster_path={sameMovie ? movieDetails.poster_path : null}
        release_date={sameMovie ? movieDetails.release_date : ""}
        title={sameMovie ? movieDetails.title : ""}
        backTo={`/movie/${id}`}
      />
      <div className="container-page max-w-3xl space-y-4 py-8">
        <h2 className="font-display text-2xl font-semibold text-gray-50">
          Reviews <span className="text-accent">{MovieReviews.length}</span>
        </h2>
        {MovieReviews.length === 0 && (
          <p className="text-gray-400">No reviews yet.</p>
        )}
        {MovieReviews.map((review) => (
          <ReviewCard key={review.id} all MovieReviews={review} />
        ))}
      </div>
    </div>
  );
};

export default MovieReviewPage;
