import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

// https://reactrouter.com/en/main/hooks/use-params

const MovieDetails = () => {
    // useParams is a hook that allows us to access the URL parameters. Thankful so much for Justin on the help / assist
  const { id: movieId } = useParams();
  // had to add the image url to the const to get the image to show up
  const imageUrl = 'https://image.tmdb.org/t/p/w500';


  // using useState hook to call the movie details
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  // created a function to fetch the movie details, using axios to make the API request
  const MovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=629a543f482aab6b6dc3287ce85f47c2&language=en-US`
      );
      // We update the state with the response data. (from the API)
      setMovie(response.data);
    } catch (error) {
        // if there is an error, we set the error state to true.
      console.error('Error fetching movie details. Please try again at a later date.', error);
    }
  };

    // useEffect is used to fetch the data from the API. It is called when the component is mounted.
  useEffect(() => {
    MovieDetails();
  }, []);

// and this error will return if the console.log returns an error setting the boolean from false to true
  if (error) return <div>Error fetching movie details. Please try again at a later date.</div>;

  return (
    <div className='movieDetail'>
      <h2 className='movieTitle'>{movie.title}</h2>
      <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} className='movieImage' />
      <p className='movieOverview'>{movie.overview}</p>
      <p>Release Date: <br />{movie.release_date}</p>
    </div>
  );
};

export default MovieDetails;
