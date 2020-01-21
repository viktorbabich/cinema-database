var express = require('express');
var router = express.Router();

var film_controller = require('../controllers/filmController');

router.get('/films', film_controller.film_list);

module.exports = router;
