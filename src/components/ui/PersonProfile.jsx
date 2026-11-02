import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import Poster from "./Poster";
import Section from "./Section";
import PosterGrid from "./PosterGrid";

// Shared person page body for the movie and series flows.
// socials: [{ href, label, Icon }]; info: [[label, value]]; knownFor: PosterGrid items.
export default function PersonProfile({
  name,
  profilePath,
  biography,
  info = [],
  alsoKnownAs = [],
  socials = [],
  knownFor = [],
}) {
  const navigate = useNavigate();

  return (
    <div className="container-page py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-accent"
      >
        <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <Poster
            path={profilePath}
            alt={name}
            eager
            className="mx-auto w-48 rounded-lg ring-1 ring-white/10 md:w-full"
          />

          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon: Glyph }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gray-200 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Glyph aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <dl className="space-y-3">
            {info.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {k}
                </dt>
                <dd className="text-sm text-gray-100">{v || "Not available"}</dd>
              </div>
            ))}
          </dl>

          {alsoKnownAs.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Also known as
              </h2>
              <ul className="mt-1 space-y-0.5 text-sm text-gray-100">
                {alsoKnownAs.slice(0, 6).map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="min-w-0">
          <h1 className="font-display text-4xl font-semibold text-gray-50 sm:text-5xl">
            {name}
          </h1>

          <Section title="Biography">
            <p className="max-w-3xl whitespace-pre-line leading-relaxed text-gray-300">
              {biography || "No biography available."}
            </p>
          </Section>

          {knownFor.length > 0 && (
            <Section title="Known for">
              <PosterGrid items={knownFor} label="Known for" />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}


