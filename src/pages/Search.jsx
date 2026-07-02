import "./Search.css";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="search">
      <div className="search__container">
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <SearchResults />
      </div>
    </section>
  );
}
