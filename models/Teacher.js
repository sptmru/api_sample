const mongoose = require('mongoose');

const teacherRatingCategorySchema = require('./TeacherRatingCategory');

const teacherSchema = new mongoose.Schema({

    forename: String,
    lastname: String,
    prefix: String,
    suffix: String,
    rating: Number,
    ratingCount: Number,
    ownRating: Number,
    ratingCategories: [teacherRatingCategorySchema],

});

module.exports = mongoose.model('Teacher', teacherSchema);