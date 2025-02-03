import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

const defaultImg = "https://via.placeholder.com/150";

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
    <div className={s.container}>
      <h2>Cast</h2>
      {loading && <Loader />}
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
