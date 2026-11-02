import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovieCastDetails,
  getMovieDetails,
} from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import CastCrewPageHeader from "../components/CastCrewPageHeader";
import PersonRow from "../../ui/PersonRow";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import Loading from "../../apiRequestError-Loading/Loading";

const MovieCastCrew = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    movieDetails,
    moviecastDetails,
    moviecastDetailsLoading,
    moviecastDetailsError,
    arrangecrewacordingtorole,
  } = useSelector((state) => state.onemoviedetails);

  const load = () => {
    dispatch(getMovieDetails(id));
    dispatch(getMovieCastDetails(id));
  };

  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getMovieCastDetails(id));
  }, [id, dispatch]);

  if (moviecastDetailsError) {
    return <Requesterror title="Could not load the cast" onRetry={load} />;
  }

  const cast = moviecastDetails?.cast ?? [];
  const crew = moviecastDetails?.crew ?? [];
  const sameMovie = String(movieDetails?.id) === String(id);

  return (
    <div>
      <CastCrewPageHeader
        poster_path={sameMovie ? movieDetails.poster_path : null}
        release_date={sameMovie ? movieDetails.release_date : ""}
        title={sameMovie ? movieDetails.title : ""}
        backTo={`/movie/${id}`}
      />
      {moviecastDetailsLoading ? (
        <Loading />
      ) : (
        <div className="container-page grid gap-10 py-8 lg:grid-cols-2">
          <section aria-labelledby="cast-h">
            <h2 id="cast-h" className="mb-3 font-display text-2xl font-semibold text-gray-50">
              Cast <span className="text-accent">{cast.length}</span>
            </h2>
            <ul>
              {cast.map((actor) => (
                <li key={`${actor.id}-${actor.credit_id ?? actor.character}`}>
                  <PersonRow
                    to={`/person/${actor.id}`}
                    name={actor.name}
                    role={actor.character}
                    profilePath={actor.profile_path}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="crew-h">
            <h2 id="crew-h" className="mb-3 font-display text-2xl font-semibold text-gray-50">
              Crew <span className="text-accent">{crew.length}</span>
            </h2>
            {Object.entries(arrangecrewacordingtorole ?? {}).map(([dept, people]) => (
              <div key={dept} className="mb-6">
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {dept}
                </h3>
                <ul>
                  {people.map((p) => (
                    <li key={`${p.id}-${p.credit_id ?? p.job}`}>
                      <PersonRow
                        to={`/person/${p.id}`}
                        name={p.name}
                        role={p.job}
                        profilePath={p.profile_path}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default MovieCastCrew;
