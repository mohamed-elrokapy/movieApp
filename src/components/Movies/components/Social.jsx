import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BsWikipedia } from "react-icons/bs";
import { HiGlobeAlt } from "react-icons/hi2";
import { getMovieSocialLinks } from "../../Redux/DetailsMoviesSlice/movieDetailsSlice";

const money = (n) =>
  n > 0 ? `$${Number(n).toLocaleString("en-US")}` : "Not available";

// Facts and external links for the sidebar of the movie page.
const Social = ({ moviedetails }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const links = useSelector((state) => state.onemoviedetails.MovieSocialLinks);

  useEffect(() => {
    dispatch(getMovieSocialLinks(id));
  }, [id, dispatch]);

  const external = [
    links.facebook_id && {
      href: `https://www.facebook.com/${links.facebook_id}`,
      label: "Facebook",
      Icon: FaFacebook,
    },
    links.twitter_id && {
      href: `https://x.com/${links.twitter_id}`,
      label: "X (Twitter)",
      Icon: FaXTwitter,
    },
    links.instagram_id && {
      href: `https://www.instagram.com/${links.instagram_id}`,
      label: "Instagram",
      Icon: FaInstagram,
    },
    links.wikidata_id && {
      href: `https://www.wikidata.org/wiki/${links.wikidata_id}`,
      label: "Wikidata",
      Icon: BsWikipedia,
    },
    moviedetails.homepage && {
      href: moviedetails.homepage,
      label: "Official site",
      Icon: HiGlobeAlt,
    },
  ].filter(Boolean);

  const facts = [
    ["Status", moviedetails.status],
    ["Original language", moviedetails.original_language?.toUpperCase()],
    ["Budget", money(moviedetails.budget)],
    ["Revenue", money(moviedetails.revenue)],
  ];

  return (
    <div className="space-y-5">
      {external.length > 0 && (
        <ul className="flex flex-wrap gap-3">
          {external.map(({ href, label, Icon: Glyph }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gray-200 transition-colors hover:border-accent hover:text-accent"
              >
                <Glyph aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
      <dl className="space-y-3">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{k}</dt>
            <dd className="text-sm text-gray-100">{v || "Not available"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Social;
