import { Link } from "react-router-dom";
import Poster from "./Poster";

// People row used on movie and series detail pages.
export default function CastRail({ people, personTo, seeAllTo, seeAllLabel }) {
  if (!people?.length) {
    return <p className="text-sm text-gray-400">No cast information available.</p>;
  }
  return (
    <>
      <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
        {people.slice(0, 12).map((p) => (
          <li key={`${p.id}-${p.character ?? ""}`} className="w-28 shrink-0 snap-start sm:w-32">
            <Link to={personTo(p)} className="group block">
              <Poster
                path={p.profile_path}
                alt={p.name}
                size="w300"
                className="rounded-lg ring-1 ring-white/10 group-hover:ring-accent/60"
              />
              <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-gray-100 group-hover:text-accent">
                {p.name}
              </p>
              {p.character && (
                <p className="line-clamp-2 text-xs text-gray-400">{p.character}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {seeAllTo && (
        <Link
          to={seeAllTo}
          className="mt-1 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
        >
          {seeAllLabel} &rarr;
        </Link>
      )}
    </>
  );
}
