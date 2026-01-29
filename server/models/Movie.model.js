import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    addedBy: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "User",
        required: true
    },
    watchedBy: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "User",
    },
    isPublic: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const Movie = mongoose.model('Movie', movieSchema)
export default Movie