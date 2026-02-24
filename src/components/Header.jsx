import React, { useState } from "react";
import "./Header.css";
import camera_black from "../assets/camera_black.svg";
import reel_black from "../assets/reel_black.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="header">
      <div className="header__overlay" />

      <div className="header__content">
        <h1 className="header__title">
          Discover films worth <br /> your time
        </h1>
        <p className="header__subtitle">
          Explore cinema with <span className="accent">Movie Vault</span>
        </p>
        <div className="header__search">
          <input
            type="text"
            placeholder="Search by title, genre, or keyword"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="header__search-button"
            onClick={() => {
              if (!searchQuery.trim()) {
                navigate("/search");
              } else {
                navigate(`/search?query=${searchQuery}`);
              }
            }}
          >
            Search
          </button>
        </div>

        <div
          className={`projector ${searchQuery.length > 0 ? "projector--visible" : ""}`}
        >
          <div className="projector__body-wrapper">
            <img src={camera_black} className="projector__body" />

            <img
              src={reel_black}
              className="projector__reel projector__reel--left"
            />

            <img
              src={reel_black}
              className="projector__reel projector__reel--right"
            />
            <div
              className={`projector__beam ${searchQuery.length > 0 ? "beam--power-on" : ""}`}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}
