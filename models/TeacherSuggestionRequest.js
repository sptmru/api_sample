const mongoose = require('mongoose');

const teacherSuggestionRequestSchema = new mongoose.Schema({

    forename: String,
    lastname: String,
    prefix: String,
    suffix: String,
    schoolUid: String

});

module.exports = mongoose.model('teacherSuggestionRequest', teacherSuggestionRequestSchema);