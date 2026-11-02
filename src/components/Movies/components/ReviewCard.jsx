import { useState } from "react";
import { FaStar } from "react-icons/fa";

const PREVIEW = 320;

export default function ReviewCard({ MovieReviews: review, all }) {
  const [expanded, setExpanded] = useState(false);

  if (!review) {
    return <p className="text-sm text-gray-400">No reviews yet.</p>;
  }

  const author =
    review.author_details?.name ||
    review.author_details?.username ||
    review.author ||
    "Anonymous";
  const rating = review.author_details?.rating;
  const content = review.content ?? "";
  const long = content.length > PREVIEW;
  const text = expanded || !long ? content : `${content.slice(0, PREVIEW).trimEnd()}...`;

  return (
    <article className="rounded-lg border border-line bg-surface p-5">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-50">A review by {author}</h3>
          {review.created_at && (
            <p className="text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>
        {all && rating != null && (
          <span className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm font-semibold text-accent">
            <FaStar aria-hidden="true" className="h-3.5 w-3.5" />
            {rating}
            <span className="sr-only"> out of 10</span>
          </span>
        )}
      </header>
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-300">{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 text-sm font-semibold text-accent hover:text-accent-soft"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}
