const mongoose = require('mongoose');

const schoolRatingCategorySchema = require('./SchoolRatingCategory');

const schoolSchema = new mongoose.Schema({

  name: String,
  street: String,
  address: String,
  countryCode: String,
  rating: Number,
  ratingCount: Number,
  ownRating: Number,
  isSelectedSchool: Boolean,
  ratingCategories: [schoolRatingCategorySchema],
  categoryType: String,
  title: String,
  order: Number,

});

module.exports = mongoose.model('School', schoolSchema);