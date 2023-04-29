import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import MovieDetails from '../DetailsPage';
import Search from '../Search';
import GenrePage from '../GenrePage';
import GenreMovies from '../GenreMovies';
import AuthFormPage from '../AuthFormPage';


// This is the main component for the app. It is responsible for fetching and displaying the data.
function App() {
  // useState is a hook that allows us to use state in functional components.
  const [movies, setMovies] = useState([]);
  // this is the current page of the API results that we are displaying, pagenation
  const [currentPage, setCurrentPage] = useState(1);
  // My API key for the Movie Database API, have it as apiKey for easier access.
  const apiKey = '629a543f482aab6b6dc3287ce85f47c2';
  // The base URL for the images from the API. Have it as imageUrl for easier access.
  const imageUrl = 'https://image.tmdb.org/t/p/w500';


  //useEffect i sued to fetch the data from the API. It is called when the component is mounted.
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

  // getPrevPage and getNextPage are used to change the page of the API results that we are displaying.
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
          <a href='/'><img src="../film-frenzy.png" className="pageLogo" alt="Film Frenzy Logo" /> </a>
        </h1>
        <div className="nav-links">
        <Link to="/genre" className='genres'>Genres</Link>

        <Link to="/auth/signup">
                Sign Up
              </Link>

              <Link to="/auth/login">
                Log In
              </Link>
         </div>
      </nav>
      <Search />

      {/* Routes*/}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h3 className="subtitle">Upcoming Movies</h3>
              {/* Pagination buttons, also disabled if we are on the first page. */}
              <div className="pagination">
                <button onClick={getPrevPage} disabled={currentPage === 1 ? true : false}>
                  Previous Page
                </button>
                <button onClick={getNextPage}>Next Page</button>
              </div>
              {movies.length > 0 ? (
                <div className="trending-container">
                  {/* mapping over the movies array and displaying tht title and image for each movies */}
                  {movies.map((movie) => (
                    // Link helps us navigate without reloading the page.
                    <Link
                      // using the movie id as the key for each movie
                      key={movie.id}
                      to={{
                        // this will be the URL path for the details page
                        pathname: `/movie/${movie.id}`,
                        state: { movie: movie, imageUrl: imageUrl },
                      }}
                    >
                      <div className='movie-card'>
                        <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} />
                        <div className="view-details">View Details</div>
                        </div>
                        <h4>{movie.title}</h4>

                    </Link>
                  ))}
                </div>
              ) : (
                <p>Loading movie data...</p>
              )}
              {/* Pagination buttons, also disabled if we are on the first page. Added some on top and bottom of the page */}
              <div className="pagination">
                <button onClick={getPrevPage} disabled={currentPage === 1 ? true : false}>
                  Previous Page
                </button>
                <button onClick={getNextPage}>Next Page</button>
              </div>
            </>
          }
        />
        {/* This is the route for the details page. */}
        <Route path="/movie/:id" element={<MovieDetails />}>
        </Route>
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/genres/:id" element={<GenreMovies />} />
        <Route path="/auth/:formType" element={<AuthFormPage />} />
      </Routes>
    </>
  );
}
export default App;



// https://github.com/react-navigation/react-navigation/issues/2395
// https://dev.to/jwp/react-hooks-azure-functions-10mc
// https://medium.com/@sumindaniro/azure-function-app-as-the-backend-api-for-webapps-reactjs-c6a6ce26246
// https://initialcommit.com/blog/usestate-useeffect-hooks-react
// https://www.syncfusion.com/blogs/post/understanding-reacts-useeffect-and-usestate-hooks.aspx
// https://dev.to/savvyshivam/keys-in-react-1ef2#:~:text=Keys%20are%20used%20in%20React,the%20items%20in%20the%20list.