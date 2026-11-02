import PosterCard, { PosterCardSkeleton } from "./PosterCard";

const GRID =
  "grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

// items: [{ id, to, title, posterPath, rating, date }]
export default function PosterGrid({ items, label }) {
  return (
    <ul className={GRID} aria-label={label}>
      {items.map((item) => (
        <li key={item.id}>
          <PosterCard {...item} />
        </li>
      ))}
    </ul>
  );
}

export function PosterGridSkeleton({ count = 12 }) {
  return (
    <div className={GRID} role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <PosterCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}
