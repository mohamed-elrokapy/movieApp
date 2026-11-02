import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSeriesAllVideos,
  getSeriesImages,
} from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import MediaTabs from "../../../ui/MediaTabs";
import Section from "../../../ui/Section";

const Media = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seriesAllVideos, seriesImages } = useSelector(
    (state) => state.SeriesDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(getSeriesAllVideos(id));
      dispatch(getSeriesImages(id));
    }
  }, [id, dispatch]);

  return (
    <Section title="Media">
      <MediaTabs
        videos={Array.isArray(seriesAllVideos) ? seriesAllVideos : []}
        backdrops={seriesImages?.backdrops ?? []}
        posters={seriesImages?.posters ?? []}
        seeAll={{
          videos: `/series/${id}/videos`,
          backdrops: `/series/${id}/backdrops`,
          posters: `/series/${id}/posters`,
        }}
      />
    </Section>
  );
};

export default Media;
