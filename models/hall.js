var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO добавить инфо о покупателе билета
// var ViewerSchema = new Schema({
//     name: String, 
//     surname: String,
//     birthDate: Date
// });

var HallSchema = new Schema({
  name: {type: String},
  seats: {type: Number}    
});

module.exports = mongoose.model('Hall', HallSchema);
