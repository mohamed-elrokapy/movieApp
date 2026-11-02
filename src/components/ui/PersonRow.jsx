import { Link } from "react-router-dom";
import Poster from "./Poster";

// Compact person entry (photo, name, role) for full cast and crew lists.
export default function PersonRow({ to, name, role, profilePath }) {
  const body = (
    <>
      <Poster
        path={profilePath}
        alt={name}
        size="w185"
        className="w-12 shrink-0 rounded"
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-gray-100">{name}</span>
        {role && <span className="block truncate text-xs text-gray-400">{role}</span>}
      </span>
    </>
  );
  const cls = "flex items-center gap-3 rounded-lg p-2";
  return to ? (
    <Link to={to} className={`${cls} hover:bg-white/5`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
