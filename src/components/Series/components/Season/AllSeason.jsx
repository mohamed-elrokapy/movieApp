import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SeriesPageShell from "../../../ui/SeriesPageShell";
import Poster from "../../../ui/Poster";

const AllSeason = () => {
  const { id } = useParams();
  const series = useSelector((state) => state.SeriesDetails.seriesDetails);
  const seasons =
    String(series?.id) === String(id) ? series.seasons ?? [] : [];

  return (
    <SeriesPageShell id={id}>
      <h2 className="mb-4 font-display text-2xl font-semibold text-gray-50">
        Seasons <span className="text-accent">{seasons.length}</span>
      </h2>
      {seasons.length === 0 ? (
        <p className="text-gray-400">No seasons available.</p>
      ) : (
        <ul className="space-y-3">
          {seasons.map((s) => (
            <li key={s.id}>
              <Link
                to={`/series/${id}/season/${s.season_number}`}
                className="flex gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-gray-500"
              >
                <Poster path={s.poster_path} alt={s.name} size="w300" className="w-20 shrink-0 rounded-md sm:w-24" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-50">{s.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {s.air_date ? new Date(s.air_date).getFullYear() : "TBA"}
                    {s.episode_count ? ` · ${s.episode_count} episodes` : ""}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    {s.overview || "No overview available."}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SeriesPageShell>
  );
};

export default AllSeason;
