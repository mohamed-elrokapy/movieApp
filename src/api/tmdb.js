// TMDB access is configured through Vite env vars (see .env.example).
// VITE_TMDB_TOKEN is a TMDB "API Read Access Token" (v4 bearer token).
// Any VITE_* value is bundled into the client, so for a real deployment put a
// small proxy in front of TMDB instead of shipping a token you cannot rotate.
const token = import.meta.env.VITE_TMDB_TOKEN;

export const hasTmdbToken = Boolean(token);

export const TMDB_AUTH = `Bearer ${token ?? ""}`;

const IMAGE_BASE = "https://image.tmdb.org/t/p";

// Returns null when TMDB has no image so callers can render a fallback.
export const tmdbImage = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;
