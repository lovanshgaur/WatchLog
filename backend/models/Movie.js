const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    watchedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

module.exports = mongoose.model("Movie", moviesSchema);
