import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

// this component will fetch the list of genres from the API and display them
const GenrePage = () => {
    // useState hook to store the list of genres
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        // this is the api using TMBD API to get the list of genres
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=629a543f482aab6b6dc3287ce85f47c2&language=en-US`
        );
        // once the data is fetched, we store the data in the state variable using the setGenres function
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    // call the function to fetch the list of genres
    getGenres();
  }, []);



  return (
    <div className="genre-page">
      <h2 className='movie-genres'>Movie Genres:</h2>
      <div className='genres-div'>
        {/* this will map over the list of genres and display them as links,
        once you click on the link it should redirect you to the genre.id page */}
        {genres.map((genre) => (
          <div key={genre.id} className='genre-list'>
            <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;


// https://developers.themoviedb.org/3/genres/get-movie-list