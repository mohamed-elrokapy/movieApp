import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-16 border-t border-line">
    <div className="container-page flex flex-col gap-4 py-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-lg text-gray-100">
          Movies<span className="text-accent"> App</span>
        </p>
        <p className="mt-1 max-w-md">
          A portfolio project by mohamed-elrokapy. Movie and series data
          comes from TMDB. This product uses the TMDB API but is not endorsed
          or certified by TMDB.
        </p>
      </div>
      <nav aria-label="Footer">
        <ul className="flex gap-5">
          <li>
            <Link to="/movies" className="hover:text-gray-100">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/series" className="hover:text-gray-100">
              Series
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="hover:text-gray-100">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
