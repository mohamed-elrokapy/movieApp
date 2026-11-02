export default function Section({ title, children, className = "" }) {
  return (
    <section className={`py-6 ${className}`}>
      <h2 className="mb-4 font-display text-2xl font-semibold text-gray-50">
        {title}
      </h2>
      {children}
    </section>
  );
}
