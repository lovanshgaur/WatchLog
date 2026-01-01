const Movie = require('../models/Movie.js')

exports.registerMovie = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title } = req.body;

        const movie = await Movie.create({
            title,
            addedBy: userId
        });
        res.status(201).json({
            message: "Movie Registered successfully",
            userId: movie._id
        });
    }
    catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ message: error.message });
    }
}

exports.findUser = async (req,res) =>{
    try {
        
    } catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ message: error.message });
        
    }
}