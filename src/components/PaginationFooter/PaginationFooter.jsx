import { useDispatch } from "react-redux";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

const TOTAL_PAGES = 500; // TMDB does not serve results beyond page 500.

const PaginationFooter = ({ next, prev, goToFirstPage, goToLastPage, page }) => {
  const dispatch = useDispatch();

  const run = (action) => () => {
    dispatch(action());
    window.scrollTo({ top: 0 });
  };

  const buttons = [
    { label: "First page", Icon: HiChevronDoubleLeft, action: goToFirstPage, off: page === 1 },
    { label: "Previous page", Icon: HiChevronLeft, action: prev, off: page === 1 },
  ];
  const after = [
    { label: "Next page", Icon: HiChevronRight, action: next, off: page === TOTAL_PAGES },
    { label: "Last page", Icon: HiChevronDoubleRight, action: goToLastPage, off: page === TOTAL_PAGES },
  ];

  const render = ({ label, Icon: Glyph, action, off }) => (
    <button
      key={label}
      type="button"
      onClick={run(action)}
      disabled={off}
      aria-label={label}
      className="btn-ghost !min-h-10 !px-3"
    >
      <Glyph aria-hidden="true" className="h-4 w-4" />
    </button>
  );

  return (
    <nav
      aria-label="Pagination"
      className="container-page flex items-center justify-center gap-2 py-10"
    >
      {buttons.map(render)}
      <p className="min-w-32 px-3 text-center text-sm text-gray-300" aria-live="polite">
        Page <strong className="text-gray-50">{page}</strong> of {TOTAL_PAGES}
      </p>
      {after.map(render)}
    </nav>
  );
};

export default PaginationFooter;
