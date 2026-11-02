// Generic spinner for pages that have not been given a dedicated skeleton.
const Loading = ({ label = "Loading" }) => (
  <div
    role="status"
    className="flex min-h-[50vh] items-center justify-center"
  >
    <div
      aria-hidden="true"
      className="h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-accent"
    />
    <span className="sr-only">{label}</span>
  </div>
);

export default Loading;
