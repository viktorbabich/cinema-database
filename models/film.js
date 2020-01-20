var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number }
});

module.exports = mongoose.model('Film', FilmSchema);
