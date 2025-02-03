import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import s from "./MoviesPage.module.css";
import SearchForm from "../../components/SearchForm/SearchForm";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchMovies(query)
      .then((results) => {
        if (results.length === 0) {
          toast.error("No movies found for your search.");
        }
        setMovies(results);
      })
      .catch(() => toast.error("Failed to fetch movies"))
      .finally(() => setLoading(false));
  }, [query]);

  const handleSearch = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div className={s.container}>
      <SearchForm onSearch={handleSearch} initialQuery={query} />
      {loading && <Loader />}
      {movies.length === 0 && query && !loading}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
