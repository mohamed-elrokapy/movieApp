import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import Poster from "../../ui/Poster";

// Compact title block for the cast/crew and reviews sub-pages.
export default function CastCrewPageHeader({ poster_path, release_date, title, backTo }) {
  const navigate = useNavigate();
  return (
    <header className="border-b border-line">
      <div className="container-page flex items-center gap-4 py-6">
        <Poster path={poster_path} alt={title || "Poster"} size="w185" className="w-16 shrink-0 rounded sm:w-20" />
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl font-semibold text-gray-50 sm:text-3xl">
            {title}
            {release_date && (
              <span className="ml-2 font-sans text-base font-normal text-gray-400">
                ({release_date.slice(0, 4)})
              </span>
            )}
          </h1>
          {backTo ? (
            <Link to={backTo} className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft">
              <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to main
            </Link>
          ) : (
            <button type="button" onClick={() => navigate(-1)} className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft">
              <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to main
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
