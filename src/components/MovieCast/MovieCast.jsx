import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    fetchMovieCast(movieId)
      .then(setCast)
      .catch(() => toast.error("Failed to load cast"))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={s.MovieCast}>
      {loading && <Loader />}
      <ul className={s.movieList}>
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
            <div>
              <p>Name:{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
