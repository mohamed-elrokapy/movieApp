import Header from "./Header";
import Footer from "./Footer";
import Home from "./components/Home/pages/index";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Contact from "./components/Contact Us/pages/Contact";
import Movies from "./components/Movies/pages/Movies";
import Series from "./components/Series/pages/Series";
import MovieDetails from "./components/Movies/pages/MovieDetails";
import MovieCastCrew from "./components/Movies/pages/MovieCastCrew";
import MovieReviewPage from "./components/Movies/pages/MovieReviewPage";
import PersonPage from "./components/Movies/pages/PersonPage";
import NotFound from "./NotFound";
import SeriesDetails from "./components/Series/pages/SeriesDetails";
import FullCast from "./components/Series/components/Cast/FullCast";
import AllSeason from "./components/Series/components/Season/AllSeason";
import SeasonDetails from "./components/Series/components/Season/SeasonDetails";
import Recommendations from "./components/Series/components/Recommendtions/Recommendations";
import RightSideDetails from "./components/Series/components/RightSide/RightSideDetails";
import ActorDetails from "./components/Series/components/ActorDetails/ActorDetails ";
import AllVideos from "./components/Series/components/Media/AllVedios";
import BackDrops from "./components/Series/components/Media/BackDrops";
import AllPoster from "./components/Series/components/Media/AllPoster";
import AllReview from "./components/Series/components/Socail/AllReview";
import MovieCollectionPage from "./components/Movies/pages/MovieCollectionPage";
import SearchResults from "./components/Series/components/SearchResults/SearchResults";
// Reset scroll on route changes (pagination changes handle their own scroll).
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-gray-200">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/cast_crew" element={<MovieCastCrew />} />
        <Route path="/movie/:id/movie_review" element={<MovieReviewPage />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route
          path="/movie/:movieId/collection/:id"
          element={<MovieCollectionPage />}
        />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/series/:id/cast" element={<FullCast />} />
        <Route path="/series/:id/seasons" element={<AllSeason />} />
        <Route path="/tv/:id/reviews" element={<AllReview />} />
        <Route
          path="/series/:id/season/:seasonNumber"
          element={<SeasonDetails />}
        />
        <Route path="/series/:id/videos" element={<AllVideos />} />
        <Route path="/series/:id/backdrops" element={<BackDrops />} />
        <Route path="/series/:id/posters" element={<AllPoster />} />
        <Route
          path="/series/:id/recommendations"
          element={<Recommendations />}
        />
        <Route path="/tv/:id/name/:name" element={<RightSideDetails />} />
        <Route
          path="/person/:personId/hisname/:personName"
          element={<ActorDetails />}
        />
        <Route path="/search/:type/:query" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;