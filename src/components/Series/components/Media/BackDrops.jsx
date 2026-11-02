import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesImages } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import SeriesPageShell from "../../../ui/SeriesPageShell";
import Poster from "../../../ui/Poster";

const BackDrops = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seriesImages, seriesImagesLoading, seriesImagesError } = useSelector(
    (state) => state.SeriesDetails
  );

  useEffect(() => {
    dispatch(getSeriesImages(id));
  }, [dispatch, id]);

  const backdrops = seriesImages?.backdrops ?? [];

  return (
    <SeriesPageShell id={id}>
      <h2 className="mb-4 font-display text-2xl font-semibold text-gray-50">
        Backdrops <span className="text-accent">{backdrops.length}</span>
      </h2>
      {seriesImagesLoading ? (
        <div className="skeleton h-48 rounded-lg" role="status" aria-label="Loading backdrops" />
      ) : seriesImagesError ? (
        <p className="text-gray-400">Backdrops could not be loaded.</p>
      ) : backdrops.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {backdrops.map((p) => (
            <li key={p.file_path}>
              <Poster path={p.file_path} alt="Backdrop" ratio="aspect-video" className="rounded-lg" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No backdrops available for this series.</p>
      )}
    </SeriesPageShell>
  );
};

export default BackDrops;
