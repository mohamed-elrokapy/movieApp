import { Link } from "react-router-dom";

// Shared error state. Pass onRetry to re-dispatch the failed request;
// without it the button reloads the page.
const Requesterror = ({
  title = "Could not load this page",
  message = "The movie data service did not respond. Check your connection or API token and try again.",
  onRetry,
}) => (
  <div
    role="alert"
    className="container-page flex min-h-[50vh] flex-col items-center justify-center py-16 text-center"
  >
    <h1 className="font-display text-3xl font-semibold text-gray-50 sm:text-4xl">
      {title}
    </h1>
    <p className="mt-3 max-w-md text-gray-400">{message}</p>
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={onRetry ?? (() => window.location.reload())}
        className="btn-primary"
      >
        Try again
      </button>
      <Link to="/" className="btn-ghost">
        Go home
      </Link>
    </div>
  </div>
);

export default Requesterror;
