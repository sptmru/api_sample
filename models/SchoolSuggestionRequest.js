const mongoose = require('mongoose');

const teachersSuggestionRequestSchema = require('./TeacherSuggestionRequest');

const SchoolSuggestionRequestSchema = new mongoose.Schema({

    name: String,
    street: String,
    postcode: String,
    place: String,
    countryCode: String,
    website: String,
    phone: String,
    teachers: [teachersSuggestionRequestSchema],

});

module.exports = mongoose.model('SchoolSuggestionRequest', SchoolSuggestionRequestSchema);
