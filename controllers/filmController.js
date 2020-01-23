var Film = require('../models/film');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// Display list of all films.
exports.film_list = function(req, res, next) {

  Film.find({}, 'name')
    .exec(function (err, list_films) {
      if (err) {return next(err)} 
      else {
            // Successful, so render
            // res.render('film_list', { title: 'Film List', film_list:  list_films});
            res.json({film_list:  list_films})
        }
    });

};

