import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesImages } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import SeriesPageShell from "../../../ui/SeriesPageShell";
import Poster from "../../../ui/Poster";

const AllPoster = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seriesImages, seriesImagesLoading, seriesImagesError } = useSelector(
    (state) => state.SeriesDetails
  );

  useEffect(() => {
    dispatch(getSeriesImages(id));
  }, [dispatch, id]);

  const posters = seriesImages?.posters ?? [];

  return (
    <SeriesPageShell id={id}>
      <h2 className="mb-4 font-display text-2xl font-semibold text-gray-50">
        Posters <span className="text-accent">{posters.length}</span>
      </h2>
      {seriesImagesLoading ? (
        <div className="skeleton h-48 rounded-lg" role="status" aria-label="Loading posters" />
      ) : seriesImagesError ? (
        <p className="text-gray-400">Posters could not be loaded.</p>
      ) : posters.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {posters.map((p) => (
            <li key={p.file_path}>
              <Poster path={p.file_path} alt="Poster" className="rounded-lg" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No posters available for this series.</p>
      )}
    </SeriesPageShell>
  );
};

export default AllPoster;
