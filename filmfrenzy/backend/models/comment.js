const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        movieId: { type: Number, require: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)