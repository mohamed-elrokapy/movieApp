import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSeasonDetails } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import SeriesPageShell from "../../../ui/SeriesPageShell";
import Poster from "../../../ui/Poster";

const SeasonDetails = () => {
  const { id, seasonNumber } = useParams();
  const dispatch = useDispatch();
  const { seasonDetails: season, seasonDetailsLoading, seasonDetailsError } =
    useSelector((state) => state.SeriesDetails);

  const load = () => dispatch(getSeasonDetails({ seriesId: id, seasonNumber }));

  useEffect(() => {
    dispatch(getSeasonDetails({ seriesId: id, seasonNumber }));
  }, [dispatch, id, seasonNumber]);

  return (
    <SeriesPageShell id={id}>
      {seasonDetailsLoading ? (
        <div className="skeleton h-48 rounded-lg" role="status" aria-label="Loading season" />
      ) : seasonDetailsError || !season ? (
        <div role="alert" className="rounded-lg border border-line bg-surface p-4 text-sm text-gray-300">
          This season could not be loaded.{" "}
          <button type="button" onClick={load} className="font-semibold text-accent hover:text-accent-soft">
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8 flex gap-5">
            <Poster path={season.poster_path} alt={season.name} size="w300" className="w-28 shrink-0 rounded-lg sm:w-40" />
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-semibold text-gray-50">{season.name}</h2>
              <p className="mt-1 text-sm text-gray-400">
                {season.air_date ? new Date(season.air_date).getFullYear() : "TBA"}
                {season.episodes?.length ? ` · ${season.episodes.length} episodes` : ""}
              </p>
              <p className="mt-3 max-w-2xl text-gray-300">
                {season.overview || "No overview available."}
              </p>
              <Link to={`/series/${id}/seasons`} className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-soft">
                View all seasons &rarr;
              </Link>
            </div>
          </div>

          <h3 className="mb-3 font-display text-2xl font-semibold text-gray-50">Episodes</h3>
          {season.episodes?.length > 0 ? (
            <ol className="space-y-3">
              {season.episodes.map((ep) => (
                <li key={ep.id} className="flex gap-4 rounded-lg border border-line bg-surface p-3">
                  <Poster path={ep.still_path} alt={ep.name} size="w300" ratio="aspect-video" className="w-32 shrink-0 self-start rounded sm:w-44" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-50">
                      {ep.episode_number}. {ep.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {ep.runtime ? `${ep.runtime} min` : ""}
                      {ep.runtime && ep.air_date ? " · " : ""}
                      {ep.air_date ?? ""}
                    </p>
                    <p className="mt-1 line-clamp-3 text-sm text-gray-300">
                      {ep.overview || "No overview available."}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-400">No episodes available.</p>
          )}
        </>
      )}
    </SeriesPageShell>
  );
};

export default SeasonDetails;
