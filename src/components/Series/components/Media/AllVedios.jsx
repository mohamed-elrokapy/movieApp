import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesAllVideos } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import SeriesPageShell from "../../../ui/SeriesPageShell";

const AllVideos = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seriesAllVideos, seriesAllVideosLoading, seriesAllVideosError } =
    useSelector((state) => state.SeriesDetails);

  useEffect(() => {
    dispatch(getSeriesAllVideos(id));
  }, [dispatch, id]);

  const videos = Array.isArray(seriesAllVideos) ? seriesAllVideos : [];

  return (
    <SeriesPageShell id={id}>
      <h2 className="mb-4 font-display text-2xl font-semibold text-gray-50">
        Videos <span className="text-accent">{videos.length}</span>
      </h2>
      {seriesAllVideosLoading ? (
        <div className="skeleton h-48 rounded-lg" role="status" aria-label="Loading videos" />
      ) : seriesAllVideosError ? (
        <p className="text-gray-400">Videos could not be loaded.</p>
      ) : videos.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id}>
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-800">
                <iframe
                  src={`https://www.youtube.com/embed/${v.key}`}
                  title={v.name}
                  loading="lazy"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-gray-400">{v.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No videos available for this series.</p>
      )}
    </SeriesPageShell>
  );
};

export default AllVideos;
