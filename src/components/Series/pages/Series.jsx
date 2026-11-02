import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationFooter from "../../PaginationFooter/PaginationFooter";
import { getseries } from "../../Redux/SeriesSlice/seriesPagesSlice";
import {
  next,
  prev,
  goToFirstPage,
  goToLastPage,
} from "../../Redux/SeriesSlice/footerPaginationSeriesSlice";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import PageHeader from "../../ui/PageHeader";
import PosterGrid, { PosterGridSkeleton } from "../../ui/PosterGrid";

const Series = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.footerPaginationseries.seriesactive);
  const { onepageseries, onepageseriesloading, onepageseriesfailedrequest } =
    useSelector((state) => state.onepageseriesapi);

  const load = () => dispatch(getseries(page));

  useEffect(() => {
    dispatch(getseries(page));
  }, [page, dispatch]);

  const items = (onepageseries ?? []).map((s) => ({
    id: s.id,
    to: `/series/${s.id}`,
    title: s.name,
    posterPath: s.poster_path,
    rating: s.vote_average,
    date: s.first_air_date,
  }));

  return (
    <div>
      <PageHeader kicker="Popular" title="Series" />
      <div className="container-page">
        {onepageseriesfailedrequest ? (
          <Requesterror
            title="Could not load series"
            message="The series list request failed. Check your connection or API token and try again."
            onRetry={load}
          />
        ) : onepageseriesloading ? (
          <PosterGridSkeleton count={18} />
        ) : items.length > 0 ? (
          <PosterGrid items={items} label="Popular series" />
        ) : (
          <p className="py-10 text-gray-400">No series found on this page.</p>
        )}
      </div>

      <PaginationFooter
        next={next}
        prev={prev}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        page={page}
      />
    </div>
  );
};

export default Series;
