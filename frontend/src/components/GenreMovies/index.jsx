import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

// This will fetch my movie genres
const GenreMovies = () => {
    // This will get the genre id from the URL
    const { id: genreId } = useParams();
    // THis will set the state of the movies.
    const [movies, setMovies] = useState([]);

    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        const getMoviesByGenre = async () => {
            try {
                // using this api to render the genres
                const response = await axios.get (
                    `https://api.themoviedb.org/3/discover/movie?api_key=629a543f482aab6b6dc3287ce85f47c2&with_genres=${genreId}`
                );
                    setMovies(response.data.results);
            } catch {
                console.log('Error getting the movies by the genre, please try again at a later date.', error)
            }
        };
        // calling the function to get the movies by genre
        getMoviesByGenre();
    }, [genreId]);


    return (
        <div className="genre-movies">
            <h2 className='genre-movie-header'> Movies: </h2>
            <div className='movie-grid'>
                {/* This will map through the movies and display them */}
                {movies.map((movie) =>(
                    <div key={movie.id} className="movie-image">
                        {/* using the link to link the movie to the details page */}
                        <Link to={`/movie/${movie.id}`}>
                        {/* this will display the movie image and title for the movie */}
                        <div className='movie-card-genre'>
                            <img src={`${imageUrl}${movie.backdrop_path}`} className="genre-image"/>
                            {/* <div className="view-details-genre">View Details</div> */}
                        </div>
                        {movie.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};    

export default GenreMovies;