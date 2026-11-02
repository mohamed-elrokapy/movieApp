import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BsWikipedia } from "react-icons/bs";
import {
  getpersondetails,
  getpersonSocialLinks,
  getpersonMovieCredits,
} from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";
import PersonProfile from "../../ui/PersonProfile";
import Requesterror from "../../apiRequestError-Loading/Requesterror";
import Loading from "../../apiRequestError-Loading/Loading";
import { GENDERS } from "../../../utils/format";

const PersonPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    persondetails: person,
    persondetailsLoading,
    persondetailsError,
    personSocialLinks: links,
    personMovieCredits,
  } = useSelector((state) => state.onemoviedetails);

  const load = () => {
    dispatch(getpersondetails(id));
    dispatch(getpersonSocialLinks(id));
    dispatch(getpersonMovieCredits(id));
  };

  useEffect(() => {
    dispatch(getpersondetails(id));
    dispatch(getpersonSocialLinks(id));
    dispatch(getpersonMovieCredits(id));
  }, [id, dispatch]);

  if (persondetailsError) {
    return <Requesterror title="Could not load this person" onRetry={load} />;
  }
  if (persondetailsLoading || String(person?.id) !== String(id)) {
    return <Loading />;
  }

  const socials = [
    links?.facebook_id && { href: `https://www.facebook.com/${links.facebook_id}`, label: "Facebook", Icon: FaFacebook },
    links?.twitter_id && { href: `https://x.com/${links.twitter_id}`, label: "X (Twitter)", Icon: FaXTwitter },
    links?.instagram_id && { href: `https://www.instagram.com/${links.instagram_id}`, label: "Instagram", Icon: FaInstagram },
    links?.wikidata_id && { href: `https://www.wikidata.org/wiki/${links.wikidata_id}`, label: "Wikidata", Icon: BsWikipedia },
  ].filter(Boolean);

  const credits = Array.isArray(personMovieCredits) ? personMovieCredits : [];
  const knownFor = [...credits]
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, 12)
    .map((m) => ({
      id: m.id,
      to: `/movie/${m.id}`,
      title: m.title,
      posterPath: m.poster_path,
      rating: m.vote_average,
      date: m.release_date,
    }));

  return (
    <PersonProfile
      name={person.name}
      profilePath={person.profile_path}
      biography={person.biography}
      socials={socials}
      alsoKnownAs={person.also_known_as ?? []}
      knownFor={knownFor}
      info={[
        ["Known for", person.known_for_department],
        ["Credits", credits.length ? String(credits.length) : ""],
        ["Gender", GENDERS[person.gender]],
        ["Birthday", person.birthday],
        ["Place of birth", person.place_of_birth],
      ]}
    />
  );
};

export default PersonPage;
