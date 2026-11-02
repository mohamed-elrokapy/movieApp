import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSeriesTrialVideo,
  getSeriesDetails,
  getSeriesCastDetails,
} from "../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import DetailHero, { DetailHeroSkeleton } from "../../ui/DetailHero";
import CastRail from "../../ui/CastRail";
import Section from "../../ui/Section";
import { formatRuntime } from "../../../utils/format";
import LastSeason from "../components/Season/LastSeason";
import Media from "../components/Media/Media";
import Recommendations from "../components/Recommendtions/Recommendations";
import RightSideDetails from "../components/RightSide/RightSideDetails";
import Social from "../components/Socail/Social";

const names = (list, n = 3) => (list ?? []).slice(0, n).map((p) => p.name);

const SeriesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((s) => s.SeriesDetails);
  const series = state.seriesDetails;

  const load = () => {
    dispatch(getSeriesDetails(id));
    dispatch(getSeriesTrialVideo(id));
    dispatch(getSeriesCastDetails(id));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (state.seriesDetailsError) {
    return (
      <Requesterror
        title="Could not load this series"
        message="The series details request failed. It may not exist, or the data service is unavailable."
        onRetry={load}
      />
    );
  }

  // Stale data from a previously opened series counts as loading.
  if (state.seriesDetailsLoading || String(series?.id) !== String(id)) {
    return <DetailHeroSkeleton />;
  }

  const cast = state.seriescastDetails?.cast ?? [];
  const crew = state.seriescastDetails?.crew ?? [];
  const creators = (series.created_by ?? []).map((c) => c.name);
  const seasons = series.number_of_seasons;

  return (
    <div>
      <DetailHero
        backdropPath={series.backdrop_path}
        posterPath={series.poster_path}
        title={series.name}
        tagline={series.tagline}
        facts={[
          series.first_air_date?.slice(0, 4),
          seasons ? `${seasons} season${seasons === 1 ? "" : "s"}` : "",
          formatRuntime(series.episode_run_time?.[0]),
          series.original_language?.toUpperCase(),
        ]}
        genres={(series.genres ?? []).map((g) => g.name)}
        rating={series.vote_average}
        voteCount={series.vote_count}
        overview={series.overview}
        credits={[
          {
            label: "Created by",
            people: creators.length ? creators : names(crew),
          },
          { label: "Starring", people: names(cast) },
        ]}
        trailerUrl={state.seriesvideotrailerUrl}
      />

      <div className="container-page grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-2">
          <Section title="Series cast" className="pt-0">
            <CastRail
              people={cast}
              personTo={(p) =>
                `/person/${p.id}/hisname/${encodeURIComponent(
                  p.name.replace(/\s+/g, "-").toLowerCase()
                )}`
              }
              seeAllTo={`/series/${series.id}/cast`}
              seeAllLabel="Full cast and crew"
            />
          </Section>
          <LastSeason />
          <Social />
          <Media />
          <Recommendations />
        </div>
        <aside aria-label="Series facts">
          <RightSideDetails />
        </aside>
      </div>
    </div>
  );
};

export default SeriesDetails;
