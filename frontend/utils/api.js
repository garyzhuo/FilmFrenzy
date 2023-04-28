import axios from 'axios'

export async function getMovies(url) {
    const { data } = await axios.get(url)
    return data
}
