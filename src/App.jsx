import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Nav from "./components/Nav";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
    </>
  );
}
