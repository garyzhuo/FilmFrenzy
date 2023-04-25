import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import CommentSection from '../CommentSection'


const MovieDetails = () => {
    // useParams is a hook that allows us to access the URL parameters. Thankful so much for Justin on the help / assist
  const { id: movieId } = useParams();
  // had to add the image url to the const to get the image to show up
  const imageUrl = 'https://image.tmdb.org/t/p/w500';

  // this will show the cast and videos for the movie in my other api requests
  const [cast, setCast] = useState([]);
  // this is for the trailer, also used down below in the youtube iframe
  const [videos, setVideos] = useState([]);

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
  
  // this will fetch all of my cast inforamtions from the API
  const CastDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=629a543f482aab6b6dc3287ce85f47c2`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.error('Error fetching cast information.', error);
    }
  };
  
  // this will fetch all of my trailer inforamtions from the API
  const Trailer = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=629a543f482aab6b6dc3287ce85f47c2&language=en-US`
      );
      setVideos(response.data.results);
    } catch (error) {
      console.error('Error fetching video information.', error);
    }
  };
  

    // useEffect is used to fetch the data from the API. It is called when the component is mounted.
  useEffect(() => {
    MovieDetails();
    CastDetails();
    Trailer();
  }, []);

  


// and this error will return if the console.log returns an error setting the boolean from false to true
  if (error) return <div>Error fetching movie details. Please try again at a later date.</div>;


  return (
    <div className='movieDetail'>
       {/* this will show the movie title, image, overview, and release date */}
      <h2 className='movieTitle'>{movie.title}</h2>
      <div className='imageAndTrailer'>
      <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} className='movieImage' />
       {/* this will show the trailer for the movie, that we got from the API */}
      {videos.length > 0 && (
        <div className="trailer">
          {/* <h3>Trailer</h3> */}
          <iframe
            title="trailer"
            width="560"
            height="345"
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>
      )}
      </div>
      <p className='movieOverview'>{movie.overview}</p>

      
      <p>Release Date: <br />{movie.release_date}</p>

    {/* this will show the cast members and the characters they play in the movie */}
      <h3>Cast Members:</h3>
      <ul className="castList">
  {cast.map((actor) => (
    <li key={actor.id}>{actor.name} as {actor.character}</li>
  ))}
</ul>



{movie.id && <CommentSection movieId={movie.id} />}
    </div>
  );
};

export default MovieDetails;


// https://developers.themoviedb.org/3/movies/get-movie-credits
// https://developers.themoviedb.org/3/movies/get-movie-videos
// https://reactrouter.com/en/main/hooks/use-params