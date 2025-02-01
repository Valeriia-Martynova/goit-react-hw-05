import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import s from "./MovieCast.module.css";

const defaultImg = "https://via.placeholder.com/150";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className={s.container}>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width={100}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
