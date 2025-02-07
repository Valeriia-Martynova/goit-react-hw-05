import { useState } from "react";
import s from "./SearchForm.module.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a movie name");
      return;
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={s.input}
        />
        <button type="submit" className={s.button}>
          <FaSearch />
        </button>
      </form>
    </motion.div>
  );
};

export default SearchForm;
