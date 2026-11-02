import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesCastDetails } from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import SeriesPageShell from "../../../ui/SeriesPageShell";
import PersonRow from "../../../ui/PersonRow";

const personTo = (p) =>
  `/person/${p.id}/hisname/${encodeURIComponent(
    p.name.replace(/\s+/g, "-").toLowerCase()
  )}`;

const FullCast = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seriescastDetails, seriescastDetailsLoading } = useSelector(
    (state) => state.SeriesDetails
  );

  useEffect(() => {
    dispatch(getSeriesCastDetails(id));
  }, [dispatch, id]);

  const cast = seriescastDetails?.cast ?? [];
  const crew = seriescastDetails?.crew ?? [];
  const byDept = crew.reduce((acc, m) => {
    const dept = m.department || "Other";
    (acc[dept] ||= []).push(m);
    return acc;
  }, {});

  return (
    <SeriesPageShell id={id}>
      {seriescastDetailsLoading ? (
        <div className="skeleton h-48 rounded-lg" role="status" aria-label="Loading cast" />
      ) : (
        <div className="grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="s-cast-h">
            <h2 id="s-cast-h" className="mb-3 font-display text-2xl font-semibold text-gray-50">
              Cast <span className="text-accent">{cast.length}</span>
            </h2>
            <ul>
              {cast.map((a) => (
                <li key={`${a.id}-${a.credit_id ?? a.character}`}>
                  <PersonRow to={personTo(a)} name={a.name} role={a.character} profilePath={a.profile_path} />
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="s-crew-h">
            <h2 id="s-crew-h" className="mb-3 font-display text-2xl font-semibold text-gray-50">
              Crew <span className="text-accent">{crew.length}</span>
            </h2>
            {Object.entries(byDept).map(([dept, people]) => (
              <div key={dept} className="mb-6">
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{dept}</h3>
                <ul>
                  {people.map((p) => (
                    <li key={`${p.id}-${p.credit_id ?? p.job}`}>
                      <PersonRow to={personTo(p)} name={p.name} role={p.job} profilePath={p.profile_path} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      )}
    </SeriesPageShell>
  );
};

export default FullCast;
