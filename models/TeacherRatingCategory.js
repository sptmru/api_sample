const mongoose = require('mongoose');

const teacherRatingCategorySchema = new mongoose.Schema({

  categoryType: String,
  title: String,
  description: String,
  order: Number,
  rating: Number,

});

module.exports = teacherRatingCategorySchema;