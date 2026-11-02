import { useSelector, useDispatch } from "react-redux";
import { FaHome } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";
import { useEffect } from "react";
import { getSeriesKeywords } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";

const linkClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-gray-200 transition-colors hover:border-accent hover:text-accent";

const RightSideDetails = () => {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.SeriesDetails.seriesDetails);
  const keywords = useSelector((state) => state.SeriesDetails.seriesKeywords);
  const keywordsError = useSelector(
    (state) => state.SeriesDetails.seriesKeywordsError
  );

  useEffect(() => {
    if (series?.id) dispatch(getSeriesKeywords(series.id));
  }, [dispatch, series?.id]);

  const language = series?.spoken_languages?.find(
    (l) => l.iso_639_1 === series?.original_language
  );

  const facts = [
    ["Original name", series?.original_name],
    ["Status", series?.status],
    ["Network", series?.networks?.[0]?.name],
    ["Type", series?.type],
    [
      "Original language",
      language
        ? language.english_name
        : series?.original_language?.toUpperCase(),
    ],
  ];

  return (
    <div className="space-y-5">
      <ul className="flex gap-3">
        {series?.homepage && (
          <li>
            <a
              href={series.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official site"
              title="Official site"
              className={linkClass}
            >
              <FaHome aria-hidden="true" className="h-4 w-4" />
            </a>
          </li>
        )}
        {series?.id && (
          <li>
            <a
              href={`https://www.themoviedb.org/tv/${series.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on TMDB"
              title="View on TMDB"
              className={linkClass}
            >
              <SiThemoviedatabase aria-hidden="true" className="h-4 w-4" />
            </a>
          </li>
        )}
      </ul>

      <dl className="space-y-3">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              {k}
            </dt>
            <dd className="text-sm text-gray-100">{v || "Not available"}</dd>
          </div>
        ))}
      </dl>

      <div>
        <h2 className="mb-3 font-display text-xl font-semibold text-gray-50">
          Keywords
        </h2>
        {keywordsError ? (
          <p className="text-sm text-gray-400">Keywords could not be loaded.</p>
        ) : keywords?.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <li
                key={k.id}
                className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-gray-200"
              >
                {k.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No keywords available.</p>
        )}
      </div>
    </div>
  );
};

export default RightSideDetails;
