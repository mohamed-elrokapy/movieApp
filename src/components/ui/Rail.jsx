import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import PosterCard, { PosterCardSkeleton } from "./PosterCard";

// Horizontally scrolling row with scroll-snap. Native scrolling keeps it
// keyboard and touch friendly; the arrow buttons are a convenience on desktop.
export default function Rail({ title, items, loading, error, onRetry, seeAll }) {
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section aria-label={title} className="py-6">
      <div className="mb-3 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-gray-50 sm:text-3xl">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {seeAll}
          <div className="hidden gap-1 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={`Scroll ${title} left`}
              className="btn-ghost !min-h-0 !p-2"
            >
              <HiChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={`Scroll ${title} right`}
              className="btn-ghost !min-h-0 !p-2"
            >
              <HiChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 text-sm text-gray-300"
        >
          <span>Could not load this list right now.</span>
          {onRetry && (
            <button type="button" onClick={onRetry} className="btn-ghost">
              Try again
            </button>
          )}
        </div>
      ) : (
        <ul
          ref={scroller}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0"
          aria-busy={loading ? "true" : "false"}
        >
          {loading
            ? Array.from({ length: 8 }, (_, i) => (
                <li key={i} className="w-36 shrink-0 sm:w-44">
                  <PosterCardSkeleton />
                </li>
              ))
            : items.map((item) => (
                <li key={item.id} className="w-36 shrink-0 snap-start sm:w-44">
                  <PosterCard {...item} />
                </li>
              ))}
        </ul>
      )}
    </section>
  );
}
