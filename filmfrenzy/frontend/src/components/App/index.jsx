import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import MovieDetails from '../DetailsPage';
import Search from '../Search';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = '629a543f482aab6b6dc3287ce85f47c2';
  const imageUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const upComingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies data. Please try again at a later date.', error);
      }
    };

    upComingMovies();
  }, [currentPage]);

  function getPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function getNextPage() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <nav className="navbar">
        <h1>
          <img src="../public/film-frenzy.png" className="pageLogo" alt="Film Frenzy Logo" />
        </h1>
      </nav>
      <Search />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h3 className="subtitle">Upcoming Movies</h3>
              <div className="pagination">
                <button onClick={getPrevPage} disabled={currentPage === 1 ? true : false}>
                  Previous Page
                </button>
                <button onClick={getNextPage}>Next Page</button>
              </div>
              {movies.length > 0 ? (
                <div className="trending-container">
                  {movies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={{
                        pathname: `/movie/${movie.id}`,
                        state: { movie, imageUrl },
                      }}
                    >
                      <div>
                        <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} />
                        <h4>{movie.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>Loading movie data...</p>
              )}
              <div className="pagination">
                <button onClick={getPrevPage} disabled={currentPage === 1 ? true : false}>
                  Previous Page
                </button>
                <button onClick={getNextPage}>Next Page</button>
              </div>
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
