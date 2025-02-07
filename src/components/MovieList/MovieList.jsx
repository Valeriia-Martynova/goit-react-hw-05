import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import s from "./MovieList.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";
const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.activeLink);
};
const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <NavLink
            className={buildLinkClass}
            to={`/movies/${movie.id}`}
            state={location}
          >
            {movie.title}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
              width={250}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
