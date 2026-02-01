import Movie from '../models/Movie.model.js';

export const postMovie = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: `Movie Title Required` })
        };
        const movie = await Movie.create({
            title,
            addedBy: req.user.id
        });

        res.status(201).json(movie)

    } catch (error) {
        res.status(500).json({ message: `Adding Movie Error: ${error}` })
        console.error(`Adding Movie Error: ${error}`);
    }
}
export const markMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findByIdAndUpdate(
            movieId,
            { $addToSet: { watchedBy: req.user.id } },
            { new: true }
        );
        if(!movie){
            return res.status(404).json({message: `Movie not found.`});
        };
        res.json({message: `Movie marked as watched.`})

    } catch (error) {
        res.status(500).json({ message: `Marking Movie Error: ${error}` })
        console.error(`Marking Movie Error: ${error}`);
    }
}
export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate("addedBy", "username avatar")
            .populate("watchedBy", "username avatar")
            .sort({ createdAt: -1 });

        res.json(movies);
    } catch (error) {
        console.error(`Fetching Movies Error: ${error}`);
        res.status(500).json({ message: `Fetching Movies Error: ${error}` })
    }
}