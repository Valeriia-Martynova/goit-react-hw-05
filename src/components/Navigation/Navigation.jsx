import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import clsx from "clsx";
import s from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.activeLink);
};
const Navigation = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/">
          <FaHome />
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          <BiMoviePlay />
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
