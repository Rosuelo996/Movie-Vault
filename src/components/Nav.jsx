import "./Nav.css";
import MovieVault_Logo2 from "../assets/MovieVault_Logo2.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  function openMenu() {
    document.body.classList.add("menu--open");
  }
  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <>
      <nav>
        <div className="nav__container">
          <div className="nav__row">
            <figure>
              <Link to="/">
              <img
                className="nav__logo--img"
                src={MovieVault_Logo2}
                alt="Movie Vault logo"
              />
              </Link>
            </figure>

            <ul className="nav__list">
              <button className="btn__menu" onClick={openMenu}>
                <FontAwesomeIcon icon={faBars} />
              </button>

              <li className="nav__links">
                <Link to="/" className="nav__link gold">
                  Home
                </Link>
              </li>

              <li className="nav__links">
                <Link to="/search" className="nav__link gold">
                  Find Your Movie
                </Link>
              </li>

              <li className="nav__links">
                <Link
                  to="/"
                  className="nav__link nav__link--primary click"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="menu__backdrop">
        <button className="btn__menu btn__menu--close" onClick={closeMenu}>
          <FontAwesomeIcon icon={faX} />
        </button>

        <div className="menu__panel">
          <Link to="/" className="menu__link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/search" className="menu__link" onClick={closeMenu}>
            Search
          </Link>
          <Link to="/" className="menu__link" onClick={closeMenu}>
            About
          </Link>
        </div>
      </div>
    </>
  );
}
