import React from "react";
import { useState } from "react";
import axios from "axios";
import './styles.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//  this will be the search function on my page
function Search() {
// this will store the text the user types in the search bar
  const [searchResults, setSearchResults] = useState('');
//   this will store the movies that match the search results
  const [searchMovies, setSearchMovies] = useState([]);
  const apiKey = '629a543f482aab6b6dc3287ce85f47c2';
  const imageUrl = 'https://image.tmdb.org/t/p/w500';

// this will be used to navigate to the details page and clear the search input
  const navigate = useNavigate();

  // this will fetch the movies that matches the search results
  const getSearchMovies = async () => {
    // if there is no search results, set the search movies to equal an empty array.
    if (!searchResults) {
      setSearchMovies([]);
      return;
    }
    // this is the api we are using from the TMBD website that will fetch the searched query.
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchResults}&page=1`
      );
      // this will set the search movies to equal the response data results
      // if there is no resonse, it will then display the error message.
      setSearchMovies(response.data.results);
    } catch (error) {
      console.log('There was an error fetching the data. Please try again at a later date.');
    }
  };

  // making it on type, so when the user types the results should render without the user clicking enter.
  const onEnterSearchInput = async (e) => {
    setSearchResults(e.target.value);
    await getSearchMovies();
  };

  // this will cler the search input when someone clicks on something.
  const clearSearchInput = () => {
    setSearchMovies([]);
  };

  // this will re-render the browser by using the navigate to force react to render to the page.
  const searchResultsOnClick = (movie) => {
    setSearchResults('');
    setSearchMovies([]);
    navigate(`/movie/${movie.id}`, { state: { movie: movie, imageUrl: imageUrl } });
  };

  // this is the search bar that will be displayed on the page.
  return (
    <div className="search-container">
      <h1> Welcome! </h1>
      <h4> Your next movie awaits. </h4>
      <input
        type="text"
        placeholder="what are we watching next?"
        className="search-input"
        value={searchResults}
        onChange={onEnterSearchInput}
      />
      {searchMovies.length > 0 && (
        <div className="search-results-container">
          {searchMovies.map((movie) => (
            <Link
            // using the movie id as the key for each movie
            key={movie.id}
            to={{
            // this will be the URL path for the details page
            pathname: `/movie/${movie.id}`,
            state: { movie: movie, imageUrl: imageUrl },
            }}
            // this will clear the search input when the user clicks on a movie
            onClick={() => searcgResultsOnClick(movie)}
            >
   {/* Display searched movies, maps over it and will display
      the movie title/ image of the movie. */}
            <div key={movie.id} className="search-result">
                <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} className='searchImage' />
              <h4>{movie.title}</h4>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;


// https://reactrouter.com/en/main/hooks/use-navigate
// https://www.geeksforgeeks.org/reactjs-usenavigate-hook/
// https://refine.dev/blog/usenavigate-react-router-redirect/