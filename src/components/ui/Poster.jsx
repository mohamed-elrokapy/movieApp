import { useState } from "react";
import { tmdbImage } from "../../api/tmdb";

// Fixed-aspect image that never collapses: a placeholder is shown while the
// image loads, when TMDB has no image, or when the request fails.
export default function Poster({
  path,
  alt,
  size = "w500",
  ratio = "aspect-[2/3]",
  className = "",
  imgClassName = "",
  eager = false,
}) {
  const src = tmdbImage(path, size);
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={`relative overflow-hidden bg-gray-800 ${ratio} ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt ? `${alt} (no image available)` : "No image available"}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-3 text-center text-xs font-medium text-gray-400"
        >
          {alt || "No image"}
        </div>
      )}
    </div>
  );
}
