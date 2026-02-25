import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeSearch = queryParams.get("query") || "";
  const navigate = useNavigate();

  useEffect(() => {

    const apiRoutes = {
    popular: "movie/popular",
    top_rated: "movie/top_rated",
    tv: "discover/tv",
    upcoming: "movie/upcoming",
  };

    async function getMovies() {
      setIsLoading(true);

      try {
        const API_KEY = import.meta.env.VITE_API_KEY;

        let baseUrl;

        if (activeSearch.trim().length > 0) {
          baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(activeSearch)}&language=en-US`;
        } else {
          baseUrl = `https://api.themoviedb.org/3/${apiRoutes[filter]}?api_key=${API_KEY}&language=en-US`;
        }

        const page1 = await axios.get(`${baseUrl}&page=1`);
        const page2 = await axios.get(`${baseUrl}&page=2`);
        const page3 = await axios.get(`${baseUrl}&page=3`);

        const combinedMovies = [
          ...page1.data.results,
          ...page2.data.results,
          ...page3.data.results,
        ];

        await new Promise((resolve) => setTimeout(resolve, 800));

        setMovies(combinedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [filter, activeSearch]);

  const displayTitles = {
    popular: (
      <>
        Popular <span className="gold">Movies</span>
      </>
    ),
    top_rated: (
      <>
        Top Rated <span className="gold">Movies</span>
      </>
    ),
    tv: (
      <>
        TV <span className="gold">Series</span>
      </>
    ),
    upcoming: (
      <>
        Upcoming <span className="gold">Movies</span>
      </>
    ),
  };

  return (
    <section className="results">
      <div className="catalogue__header">
        <h2 className="catalogue__title">
          {activeSearch.trim().length > 0
            ? `Search results for "${activeSearch}"`
            : displayTitles[filter]}
        </h2>

        <div className="filter">
          <button
            className="filter__btn"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Filter ▾
          </button>

          {isOpen && (
            <div className="filter__menu">
              <button
                className="filter__option"
                onClick={() => {
                  setFilter("popular");
                  navigate("/search");
                  setIsOpen(false);
                }}
              >
                Popular
              </button>

              <button
                className="filter__option"
                onClick={() => {
                  setFilter("top_rated");
                  navigate("/search");
                  setIsOpen(false);
                }}
              >
                Top Rated
              </button>

              <button
                className="filter__option"
                onClick={() => {
                  setFilter("tv");
                  navigate("/search");
                  setIsOpen(false);
                }}
              >
                Series
              </button>

              <button
                className="filter__option"
                onClick={() => {
                  setFilter("upcoming");
                  navigate("/search");
                  setIsOpen(false);
                }}
              >
                Upcoming
              </button>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="results__grid">
        {Array.from({ length: 20 }).map((_, index) => (
            <div className="movie-card skeleton" key={index}>
              <div className="skeleton__poster"></div>
              <div className="movie-card__info">
                <div className="skeleton__title"></div>
                <div className="skeleton__year"></div>
              </div>
            </div>
        ))}
        </div>
      ) : activeSearch.trim().length > 0 && movies.length === 0 ? (
        <div className="no-results">
          <h3 className="no-results__title">No results found</h3>
          <p className="no-results__subtitle">
            We couldn’t find anything matching
            <span> "{activeSearch}"</span>
          </p>
          <button className="no-results__btn" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      ) : (
        <div className="results__grid">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              className="movie-card"
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Movie Poster"
              />
              <div className="movie-card__info">
                <h3>{movie.title || movie.name}</h3>
                <p>
                  {(movie.release_date || movie.first_air_date)?.slice(0, 4) ||
                    "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
