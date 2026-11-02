export default function PageHeader({ title, kicker, children }) {
  return (
    <header className="container-page pb-6 pt-10">
      {kicker && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {kicker}
        </p>
      )}
      <h1 className="font-display text-4xl font-semibold text-gray-50 sm:text-5xl">
        {title}
      </h1>
      {children}
    </header>
  );
}
