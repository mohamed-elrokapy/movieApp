import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovieImages,
  getMovieVideos,
} from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import MediaTabs from "../../ui/MediaTabs";

const Moviemedia = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movievideos, movieImages } = useSelector(
    (state) => state.onemoviedetails
  );

  useEffect(() => {
    dispatch(getMovieVideos(id));
    dispatch(getMovieImages(id));
  }, [id, dispatch]);

  return (
    <MediaTabs
      videos={movievideos ?? []}
      backdrops={movieImages?.backdrops ?? []}
      posters={movieImages?.posters ?? []}
    />
  );
};

export default Moviemedia;
