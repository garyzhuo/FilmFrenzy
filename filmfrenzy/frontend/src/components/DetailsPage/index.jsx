import React from "react";
import { useLocation } from "react-router-dom";

// https://blog.logrocket.com/using-hooks-react-router/#:~:text=the%20history%20stack.-,useLocation,event%20whenever%20the%20URL%20changes.
//https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react

function MovieDetails() {
    // we're using the location hook to get the object location
    const location = useLocation();
    // we're destructuring the movie and imageUrl from the location object
    const { movie, imageUrl } = location.state;


    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
        </div>
    )

}

export default MovieDetails;