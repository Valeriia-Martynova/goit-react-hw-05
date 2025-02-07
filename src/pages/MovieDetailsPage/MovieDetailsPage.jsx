import { useEffect, useState, useRef, Suspense } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { FaAngleLeft } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { FaPeopleGroup } from "react-icons/fa6";
import clsx from "clsx";
import s from "./MovieDetailsPage.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.activeLink);
};
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const goBackUrl = useRef(location?.state ?? "/movies");

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(() => toast.error("Failed to load movie details"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (!movie) return null;

  return (
    <div className={s.details}>
      <Link className={s.goBack} to={goBackUrl.current}>
        {" "}
        <FaAngleLeft />
        Go back
      </Link>
      <div className={s.movieInfo}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          width={250}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <ul className={s.genresList}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <nav>
        <NavLink className={buildLinkClass} to="cast">
          <FaPeopleGroup />
          Cast
        </NavLink>
        <NavLink className={buildLinkClass} to="reviews">
          <VscPreview />
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
