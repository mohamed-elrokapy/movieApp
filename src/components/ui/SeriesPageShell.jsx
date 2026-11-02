import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesDetails } from "../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import CastCrewPageHeader from "../Movies/components/CastCrewPageHeader";
import Requesterror from "../apiRequestError-Loading/Requesterror";

// Header + data guard for the series sub-pages (cast, seasons, media, reviews).
// Makes sure the series itself is loaded, including on a direct page load.
export default function SeriesPageShell({ id, children }) {
  const dispatch = useDispatch();
  const { seriesDetails: series, seriesDetailsError } = useSelector(
    (state) => state.SeriesDetails
  );
  const same = String(series?.id) === String(id);

  useEffect(() => {
    if (!same) dispatch(getSeriesDetails(id));
  }, [dispatch, id, same]);

  if (seriesDetailsError && !same) {
    return (
      <Requesterror
        title="Could not load this series"
        onRetry={() => dispatch(getSeriesDetails(id))}
      />
    );
  }

  return (
    <div>
      <CastCrewPageHeader
        poster_path={same ? series.poster_path : null}
        release_date={same ? series.first_air_date : ""}
        title={same ? series.name : ""}
        backTo={`/series/${id}`}
      />
      <div className="container-page py-8">{children}</div>
    </div>
  );
}
