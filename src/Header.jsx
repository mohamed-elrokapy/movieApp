import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiBars3, HiXMark, HiMagnifyingGlass } from "react-icons/hi2";
import { getMoviebySearch } from "./components/Redux/DetailsMoviesSlice/movieDetailsSlice";
import { getSeriesBySearch } from "./components/Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import { tmdbImage } from "./api/tmdb";
import { yearOf } from "./utils/format";

const LINKS = [
  { label: "Home", to: "/", end: true },
  { label: "Movies", to: "/movies" },
  { label: "Series", to: "/series" },
  { label: "Contact", to: "/contact-us" },
];

const linkClass = ({ isActive }) =>
  `rounded px-2 py-1.5 text-sm font-medium transition-colors ${
    isActive ? "text-accent" : "text-gray-300 hover:text-gray-50"
  }`;

const titleOf = (item) =>
  item.title || item.name || item.original_name || "Untitled";

function SearchBox({ idPrefix, onNavigate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listId = `${idPrefix}-listbox`;
  const [type, setType] = useState("movies");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [failed, setFailed] = useState(false);
  const requestId = useRef(0);
  const root = useRef(null);

  // Debounced suggestions. Responses from older queries are ignored.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setOpen(false);
      setFailed(false);
      return undefined;
    }
    const timer = setTimeout(async () => {
      const mine = ++requestId.current;
      const thunk = type === "movies" ? getMoviebySearch : getSeriesBySearch;
      try {
        const found = await dispatch(thunk(q)).unwrap();
        if (mine !== requestId.current) return;
        setResults((found ?? []).slice(0, 6));
        setFailed(false);
        setActive(-1);
        setOpen(true);
      } catch {
        if (mine !== requestId.current) return;
        setResults([]);
        setFailed(true);
        setOpen(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, type, dispatch]);

  useEffect(() => {
    const onDown = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const finish = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    onNavigate?.();
  };

  const go = (item) => {
    navigate(`/${type === "movies" ? "movie" : "series"}/${item.id}`);
    finish();
  };

  const submit = (e) => {
    e.preventDefault();
    if (open && active >= 0 && results[active]) {
      go(results[active]);
      return;
    }
    const q = query.trim();
    if (!q) return;
    navigate(`/search/${type}/${encodeURIComponent(q)}`);
    finish();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  };

  return (
    <form
      ref={root}
      role="search"
      onSubmit={submit}
      className="relative flex w-full items-center gap-2"
    >
      <label htmlFor={`${idPrefix}-type`} className="sr-only">
        Search in
      </label>
      <select
        id={`${idPrefix}-type`}
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="h-10 rounded-md border border-line bg-surface px-2 text-sm text-gray-100"
      >
        <option value="movies">Movies</option>
        <option value="series">Series</option>
      </select>

      <div className="relative min-w-0 flex-1">
        <label htmlFor={`${idPrefix}-q`} className="sr-only">
          Search {type}
        </label>
        <HiMagnifyingGlass
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        />
        <input
          id={`${idPrefix}-q`}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            active >= 0 ? `${idPrefix}-opt-${active}` : undefined
          }
          autoComplete="off"
          placeholder={`Search ${type}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => results.length && setOpen(true)}
          className="h-10 w-full rounded-md border border-line bg-surface pl-9 pr-3 text-sm text-gray-50 placeholder:text-gray-400"
        />

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Suggestions"
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-lg border border-line bg-surface py-1 shadow-2xl shadow-black/60 lg:left-auto lg:w-96"
          >
            {failed && (
              <li className="px-3 py-2 text-sm text-gray-300">
                Suggestions are unavailable right now.
              </li>
            )}
            {!failed && results.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-300">No matches.</li>
            )}
            {results.map((item, i) => (
              <li
                key={item.id}
                id={`${idPrefix}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(item);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm ${
                  i === active ? "bg-white/10 text-gray-50" : "text-gray-200"
                }`}
              >
                {tmdbImage(item.poster_path, "w92") ? (
                  <img
                    src={tmdbImage(item.poster_path, "w92")}
                    alt=""
                    className="h-14 w-10 shrink-0 rounded bg-gray-800 object-cover"
                  />
                ) : (
                  <span className="h-14 w-10 shrink-0 rounded bg-gray-800" />
                )}
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {titleOf(item)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {yearOf(item.release_date || item.first_air_date)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="btn-primary !min-h-10 shrink-0">
        Search
      </button>
    </form>
  );
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const uid = useId().replace(/:/g, "");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center gap-6">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-gray-50"
        >
          Movies<span className="text-accent"> App</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden w-full max-w-lg lg:block">
          <SearchBox idPrefix={`${uid}-d`} />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="btn-ghost ml-auto !p-2 lg:hidden"
        >
          {menuOpen ? (
            <HiXMark aria-hidden="true" className="h-6 w-6" />
          ) : (
            <HiBars3 aria-hidden="true" className="h-6 w-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <div className="container-page space-y-4 py-4">
            <nav aria-label="Main mobile">
              <ul className="grid gap-1">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.end}
                      onClick={() => setMenuOpen(false)}
                      className={(s) => `block ${linkClass(s)} !py-2.5 text-base`}
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <SearchBox
              idPrefix={`${uid}-m`}
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
