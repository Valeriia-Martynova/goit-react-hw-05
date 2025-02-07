import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import s from "./MovieList.module.css";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
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
