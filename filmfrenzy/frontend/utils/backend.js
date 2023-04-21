import axios from 'axios';

export async function getMovies() {
    const response = await axios.get('/api/movies');
    return response.data;
}