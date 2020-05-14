const mongoose = require('mongoose')

const schoolRatingCategorySchema = new mongoose.Schema({

  categoryType: String,
  title: String,
  order: Number,
  rating: Number,

});

module.exports = schoolRatingCategorySchema;