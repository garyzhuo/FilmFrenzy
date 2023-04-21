import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { getMovies } from '../../../utils/backend';


// https://dev.to/jwp/react-hooks-azure-functions-10mc
// https://medium.com/@sumindaniro/azure-function-app-as-the-backend-api-for-webapps-reactjs-c6a6ce26246
// https://initialcommit.com/blog/usestate-useeffect-hooks-react
// https://www.syncfusion.com/blogs/post/understanding-reacts-useeffect-and-usestate-hooks.aspx

// This is the main component for the app. It is responsible for fetching and displaying the data.
function App() {
  // useState is a hook that allows us to use state in functional components.
  const [movies, setMovies] = useState([]);
  // My API key for the Movie Database API, have it as apiKey for easier access.
  const apiKey = '629a543f482aab6b6dc3287ce85f47c2';
  // The base URL for the images from the API. Have it as imageUrl for easier access.
  const imageUrl = 'https://image.tmdb.org/t/p/w500';


  //useEffect i sued to fetch the data from the API. It is called when the component is mounted.
  useEffect(() => {
    const upComingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies data. Please try again at a later date.', error);
      }
    };

    upComingMovies();
  }, []);

  return (
    <>
      <h1>Film Frenzy</h1>
      <h3 className="subtitle">Upcoming Movies</h3>
      {/* If there are movies in the movies array, display them. Otherwise, display a loading message. */}
      {movies.length > 0 ? (
        <div>
          {/* Map over the movies array and display the title and overview for each movie. */}
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div >
      ) : (
        <p>Loading movie data...</p>
      )
      }
    </>
  );
}

export default App;
