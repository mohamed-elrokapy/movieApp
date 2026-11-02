import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Poster from "./Poster";

const yearOf = (date) => (date ? String(date).slice(0, 4) : "");

// One card used by every poster grid and rail on the site.
export default function PosterCard({ to, title, posterPath, rating, date }) {
  const year = yearOf(date);
  const score = Number(rating);

  return (
    <Link
      to={to}
      className="group block rounded-lg focus-visible:outline-offset-4"
    >
      <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:ring-accent/60">
        <Poster
          path={posterPath}
          alt={title}
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {score > 0 && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-black/75 px-1.5 py-0.5 text-xs font-semibold text-accent backdrop-blur-sm">
            <FaStar aria-hidden="true" className="h-3 w-3" />
            <span>
              <span className="sr-only">Rating </span>
              {score.toFixed(1)}
            </span>
          </span>
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-gray-100 group-hover:text-accent">
        {title}
      </h3>
      {year && <p className="text-xs text-gray-400">{year}</p>}
    </Link>
  );
}

export function PosterCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton aspect-[2/3] rounded-lg" />
      <div className="skeleton mt-2 h-3.5 w-4/5 rounded" />
      <div className="skeleton mt-1.5 h-3 w-1/4 rounded" />
    </div>
  );
}
