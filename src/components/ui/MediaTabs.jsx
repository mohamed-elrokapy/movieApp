import { useState } from "react";
import { Link } from "react-router-dom";
import Poster from "./Poster";

const LIMIT = 6;

// Tabbed videos / backdrops / posters block shared by movies and series.
// seeAll: optional { videos, backdrops, posters } route paths.
export default function MediaTabs({ videos = [], backdrops = [], posters = [], seeAll = {} }) {
  const [active, setActive] = useState("videos");

  const tabs = [
    { key: "videos", label: "Videos", count: videos.length },
    { key: "backdrops", label: "Backdrops", count: backdrops.length },
    { key: "posters", label: "Posters", count: posters.length },
  ];
  const total = { videos, backdrops, posters }[active].length;

  return (
    <div>
      <div role="tablist" aria-label="Media" className="mb-4 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`media-tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls="media-panel"
            onClick={() => setActive(t.key)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
              active === t.key
                ? "border-accent text-accent"
                : "border-transparent text-gray-300 hover:text-gray-50"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div role="tabpanel" id="media-panel" aria-labelledby={`media-tab-${active}`}>
        {total === 0 && (
          <p className="text-sm text-gray-400">No {active} available.</p>
        )}

        {active === "videos" && videos.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {videos.slice(0, LIMIT).map((video) => (
              <li key={video.id}>
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    loading="lazy"
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-gray-400">{video.name}</p>
              </li>
            ))}
          </ul>
        )}

        {active === "backdrops" && backdrops.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {backdrops.slice(0, LIMIT).map((b) => (
              <li key={b.file_path}>
                <Poster path={b.file_path} alt="Backdrop" ratio="aspect-video" className="rounded-lg" />
              </li>
            ))}
          </ul>
        )}

        {active === "posters" && posters.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {posters.slice(0, LIMIT).map((p) => (
              <li key={p.file_path}>
                <Poster path={p.file_path} alt="Poster" className="rounded-lg" />
              </li>
            ))}
          </ul>
        )}

        {total > LIMIT && seeAll[active] && (
          <Link
            to={seeAll[active]}
            className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
          >
            See all {total} {active} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
