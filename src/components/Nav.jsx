import "./Nav.css";
import { useNavigate } from "react-router-dom";
import MovieVault_Logo2 from "../assets/MovieVault_Logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {

  const navigate = useNavigate();

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
              <img
                className="nav__logo--img"
                src={MovieVault_Logo2}
                alt="Movie Vault logo"
                onClick={() => navigate("/")}
              />
            </figure>

            <ul className="nav__list">
              <button className="btn__menu" onClick={openMenu}>
                <FontAwesomeIcon icon={faBars} />
              </button>

              <li className="nav__links">
                <span className="nav__link gold" onClick={() => navigate("/")}>
                  Home
                </span>
              </li>

              <li className="nav__links">
                <span
                  className="nav__link gold"
                  onClick={() => navigate("/search")}
                >
                  Find Your Movie
                </span>
              </li>

              <li className="nav__links">
                <span
                  className="nav__link nav__link--primary click"
                  onClick={() => navigate("/")}
                >
                  Contact Us
                </span>
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
          <span
            className="menu__link"
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            Home
          </span>

          <span
            className="menu__link"
            onClick={() => {
              closeMenu();
              navigate("/search");
            }}
          >
            Search
          </span>

          <span
            className="menu__link"
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            About
          </span>
        </div>
      </div>
    </>
  );
}
