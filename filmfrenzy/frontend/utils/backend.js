import axios from 'axios';

export async function getMovies() {
    const response = await axios.get('/api/movies/');
    return response.data;
}

export async function postComment(comment) {
    const { data } = await axios.post('/api/comments', comment)
    return data
}

export async function updateComment(comment, id) {
    const { data } = await axios.put(`/api/comments/${movieId}`, comment)
    return data
}

export async function deleteComment(id) {
    const { data } = await axios.delete(`/api/comments/${movieId}`)
    return data
}