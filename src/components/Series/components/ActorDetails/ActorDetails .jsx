import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getPersonDetails,
  getPersonKnownFor,
  getPersonSocialMedia,
} from "../../../Redux/DetailsSeriesSlice/DetailsSeriesSlice";
import {
  FaFacebook,
  FaInstagram,
  FaImdb,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import PersonProfile from "../../../ui/PersonProfile";
import Loading from "../../../apiRequestError-Loading/Loading";
import Requesterror from "../../../apiRequestError-Loading/Requesterror";
import { GENDERS } from "../../../../utils/format";

const ActorDetails = () => {
  const { personId } = useParams();
  const dispatch = useDispatch();

  const {
    PersonDetails: person,
    PersonDetailsLoading,
    PersonDetailsError,
    PersonKnownFor,
    PersonSocialMedia: links,
  } = useSelector((state) => state.SeriesDetails);

  const load = () => {
    dispatch(getPersonDetails(personId));
    dispatch(getPersonKnownFor(personId));
    dispatch(getPersonSocialMedia(personId));
  };

  useEffect(() => {
    dispatch(getPersonDetails(personId));
    dispatch(getPersonKnownFor(personId));
    dispatch(getPersonSocialMedia(personId));
  }, [dispatch, personId]);

  if (PersonDetailsError) {
    return <Requesterror title="Could not load this person" onRetry={load} />;
  }
  if (PersonDetailsLoading || String(person?.id) !== String(personId)) {
    return <Loading />;
  }

  const socials = [
    links?.facebook_id && { href: `https://www.facebook.com/${links.facebook_id}`, label: "Facebook", Icon: FaFacebook },
    links?.twitter_id && { href: `https://x.com/${links.twitter_id}`, label: "X (Twitter)", Icon: FaXTwitter },
    links?.instagram_id && { href: `https://www.instagram.com/${links.instagram_id}`, label: "Instagram", Icon: FaInstagram },
    links?.youtube_id && { href: `https://www.youtube.com/${links.youtube_id}`, label: "YouTube", Icon: FaYoutube },
    links?.tiktok_id && { href: `https://www.tiktok.com/@${links.tiktok_id}`, label: "TikTok", Icon: FaTiktok },
    links?.imdb_id && { href: `https://www.imdb.com/name/${links.imdb_id}`, label: "IMDb", Icon: FaImdb },
  ].filter(Boolean);

  // Credits can be movies or series; link each to the matching route.
  const knownFor = (PersonKnownFor ?? []).map((w) => {
    const isMovie = w.media_type === "movie" || (!w.media_type && w.title);
    return {
      id: `${isMovie ? "m" : "s"}-${w.id}`,
      to: `/${isMovie ? "movie" : "series"}/${w.id}`,
      title: w.title || w.name,
      posterPath: w.poster_path,
      rating: w.vote_average,
      date: w.release_date || w.first_air_date,
    };
  });

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
        ["Gender", GENDERS[person.gender]],
        ["Birthday", person.birthday],
        ["Place of birth", person.place_of_birth],
      ]}
    />
  );
};

export default ActorDetails;
