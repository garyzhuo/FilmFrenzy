import axios from 'axios';



export async function getComments(movieId) {
    const  response   = await axios.get(`/api/comments/movie/${movieId}`);
    return response.data;
}

export async function postComment(commentData) {
    const { data } = await axios.post(`/api/comments/`, commentData);
    return data;
}
  

export async function updateComment(comment, id) {
    const { data } = await axios.put(`/api/comments/${id}`, comment)
    return data
}

export async function deleteComment(id) {
    const { data } = await axios.delete(`/api/comments/${id}`)
    return data
}
