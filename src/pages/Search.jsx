import "./Search.css";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <section className="search">
      <div className="search__container">
        <button 
        className="back-button" 
        onClick={() => navigate("/search")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <SearchResults />
      </div>
    </section>
  );
}
