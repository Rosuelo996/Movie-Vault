import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faXmark,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovie() {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const url_video = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

      const response = await axios.get(url);
      setMovieDetails(response.data);

      const videoResponse = await axios.get(url_video);
      const videos = videoResponse.data.results;
      const trailer = videos.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
      console.log("Trailer key:", trailer?.key);
    }
    getMovie();
  }, [id]);

  if (!movieDetails) {
    return null;
  }

  return (
    <section
      className="details"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
      }}
    >
      <button className="back-button" 
      onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="details__container">
        <img
          className="details__poster"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />

        <div className="details__info">
          <h1>{movieDetails.title}</h1>

          <div className="details__meta">
            <span className="details__rating">
              <FontAwesomeIcon icon={faStar} />{" "}
              {movieDetails.vote_average.toFixed(1)}
            </span>
            <span>{movieDetails.release_date.slice(0, 4)}</span>
            <span>{movieDetails.runtime} min</span>
          </div>
          <p>{movieDetails.overview}</p>
          <button
            className="trailer__btn"
            onClick={() => setIsTrailerOpen(true)}
          >
            ▶ Watch Trailer
          </button>
        </div>
      </div>

      {trailerKey && isTrailerOpen && (
        <div className="trailer">
          <div className="trailer__content">
            <button
              className="trailer__close"
              onClick={() => setIsTrailerOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
