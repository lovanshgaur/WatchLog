import Movie from '../models/Movie.model.js';

export const postMovie = async (req,res) => {
    res.send('Post Movie')
}
export const markMovie = async (req,res) => {
    res.send('Mark Movie')
}
export const getMovies = async (req,res) => {
    res.send('Get Movie')
}