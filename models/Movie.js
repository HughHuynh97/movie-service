const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    description: { type: String },
    genre:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    categoryId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    duration:    { type: Number },
    releaseDate: { type: Date },
    posterUrl:   { type: String },
    videoUrl:    { type: String },
    views:       { type: Number, default: 0 },
    rating:      { type: Number, default: 0 },
    createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
