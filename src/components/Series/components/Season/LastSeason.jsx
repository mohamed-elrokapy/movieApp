import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSeriesDetails } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import Poster from "../../../ui/Poster";
import Section from "../../../ui/Section";

const LastSeason = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { seriesDetails } = useSelector((state) => state.SeriesDetails);

  useEffect(() => {
    if (id && !seriesDetails) dispatch(getSeriesDetails(id));
  }, [dispatch, id, seriesDetails]);

  // Specials are season 0; the latest real season has the highest number.
  const latest = [...(seriesDetails?.seasons ?? [])]
    .filter((s) => s.season_number !== 0)
    .sort((a, b) => b.season_number - a.season_number)[0];

  return (
    <Section title="Latest season">
      {latest ? (
        <Link
          to={`/series/${id}/season/${latest.season_number}`}
          className="flex gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-gray-500"
        >
          <Poster
            path={latest.poster_path}
            alt={latest.name}
            size="w300"
            className="w-24 shrink-0 rounded-md sm:w-32"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-50">{latest.name}</h3>
            <p className="mt-1 text-sm text-gray-400">
              {latest.air_date ? new Date(latest.air_date).getFullYear() : "TBA"}
              {latest.episode_count ? ` · ${latest.episode_count} episodes` : ""}
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-gray-300">
              {latest.overview || "No overview available."}
            </p>
          </div>
        </Link>
      ) : (
        <p className="text-sm text-gray-400">No seasons for this series.</p>
      )}
      <Link
        to={`/series/${id}/seasons`}
        className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
      >
        View all seasons &rarr;
      </Link>
    </Section>
  );
};

export default LastSeason;
