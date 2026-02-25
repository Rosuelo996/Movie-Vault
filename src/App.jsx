import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Nav from "./components/Nav";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  const location = useLocation()

  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search key={location.search}/>} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
    </>
  );
}
