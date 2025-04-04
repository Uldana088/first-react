import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route,Link,useParams,} from "react-router-dom";
import axios from "axios";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = (searchResults) => {
    setMovies(searchResults);
  };

  return (
    <Router>
      <div className="App">
        <h1>Movie Izdeu Qosymshasy</h1>
        <Search onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=17dec6d0&s=${query}`
      );
      if (response.data.Response === "False") {
        onSearch([]);
        setError("Film tabylmady!");
      } else {
        onSearch(response.data.Search);
        setError("");
      }
    } catch (error) {
      console.log("Qate:", error);
      setError("Filmderdi izdeu kezinde qate boldy!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={searchMovies}>
      <input
        type="text"
        placeholder="Film atawyn engiziniz"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Izdew..." : "Izdew"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="movie-card"
            aria-label={`Tolygraq ${movie.Title} filmi turaly`}
          >
            <div className="movie-poster">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={`Poster ${movie.Title}`}
                loading="lazy"
              />
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-meta">
                <span>{movie.Year}</span> *{" "}
                <span>{movie.Type === "movie" ? "Film" : "Serial"}</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>Film tabylmady</p>
      )}
    </div>
  );
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=17dec6d0&i=${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.log("film izdeude qate oryn aldy", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p className="loading">Juktelyde</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <p>
        <strong>Zhanr:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Rejisser:</strong> {movie.Director}
      </p>
      <p>
        <strong>Jyl:</strong> {movie.Year}
      </p>
      <Link to="/">Artka</Link>
    </div>
  );
};