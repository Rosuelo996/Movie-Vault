import { useNavigate } from "react-router-dom";
import "./SearchHeader.css";

export default function SearchHeader({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  return (
    <div className="search-header">
      <div className="search-header__overlay"></div>

      <div className="search-header__content">
        <h2 className="search-header__title">Find Your Movie</h2>

        <div className="search-header__row">
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            type="text"
            placeholder="Search by title, genre or keyword"
            value={searchQuery}
          />
          <button
            onClick={() => {
              if (!searchQuery.trim()) return;
              navigate(`/search?query=${searchQuery}`);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
