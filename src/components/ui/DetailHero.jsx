import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaStar } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi2";
import Poster from "./Poster";
import Videofram from "../Movies/components/Videofram";
import { tmdbImage } from "../../api/tmdb";

// Shared hero for movie and series detail pages.
// credits: [{ label, people: ["Name", ...] }]
export default function DetailHero({
  backdropPath,
  posterPath,
  title,
  tagline,
  facts = [],
  genres = [],
  rating,
  voteCount,
  overview,
  credits = [],
  trailerUrl,
}) {
  const navigate = useNavigate();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const backdrop = tmdbImage(backdropPath, "w1280");
  const score = Number(rating);

  return (
    <section
      aria-labelledby="detail-title"
      className="relative isolate overflow-hidden border-b border-line"
    >
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-top opacity-60"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40 md:bg-gradient-to-r md:from-ink md:via-ink/85 md:to-ink/30"
      />

      <div className="container-page py-8 md:py-14">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-accent"
        >
          <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back
        </button>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="w-40 shrink-0 sm:w-56 md:w-72">
            <Poster
              path={posterPath}
              alt={title}
              eager
              className="rounded-lg shadow-2xl shadow-black/60 ring-1 ring-white/15"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1
              id="detail-title"
              className="font-display text-3xl font-semibold leading-tight text-gray-50 sm:text-4xl lg:text-5xl"
            >
              {title || "Untitled"}
            </h1>
            {tagline && (
              <p className="mt-2 font-display text-lg italic text-gray-300">
                {tagline}
              </p>
            )}

            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
              {score > 0 && (
                <li className="inline-flex items-center gap-1.5 font-semibold text-accent">
                  <FaStar aria-hidden="true" className="h-4 w-4" />
                  <span>
                    {score.toFixed(1)}
                    <span className="sr-only"> out of 10</span>
                  </span>
                  {voteCount > 0 && (
                    <span className="font-normal text-gray-400">
                      ({voteCount.toLocaleString("en-US")})
                    </span>
                  )}
                </li>
              )}
              {facts.filter(Boolean).map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>

            {genres.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Genres">
                {genres.map((g) => (
                  <li
                    key={g}
                    className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium text-gray-200"
                  >
                    {g}
                  </li>
                ))}
              </ul>
            )}

            <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Overview
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-gray-200">
              {overview || "No overview available."}
            </p>

            {credits.some((c) => c.people.length > 0) && (
              <dl className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
                {credits
                  .filter((c) => c.people.length > 0)
                  .map((c) => (
                    <div key={c.label}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {c.label}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-100">
                        {c.people.join(", ")}
                      </dd>
                    </div>
                  ))}
              </dl>
            )}

            {trailerUrl && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setTrailerOpen(true)}
                  className="btn-primary"
                >
                  <FaPlay aria-hidden="true" className="h-3.5 w-3.5" />
                  Watch trailer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {trailerOpen && trailerUrl && (
        <Videofram
          open={trailerOpen}
          handleOpen={() => setTrailerOpen(false)}
          videoSrc={trailerUrl}
        />
      )}
    </section>
  );
}

export function DetailHeroSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading details"
      className="border-b border-line"
    >
      <div className="container-page py-8 md:py-14">
        <div className="skeleton mb-6 h-4 w-16 rounded" />
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="skeleton aspect-[2/3] w-40 shrink-0 rounded-lg sm:w-56 md:w-72" />
          <div className="flex-1 space-y-4">
            <div className="skeleton h-10 w-2/3 rounded" />
            <div className="skeleton h-4 w-1/3 rounded" />
            <div className="skeleton h-4 w-full max-w-2xl rounded" />
            <div className="skeleton h-4 w-full max-w-2xl rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </section>
  );
}
