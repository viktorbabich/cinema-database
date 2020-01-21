#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
// var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Film = require('./models/film')
var Hall = require('./models/hall')
var Session = require('./models/session')


var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/cinema';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var films = []
var halls = []
var sessions = []

function filmsCreate(name, duration, cb) {
  var film = new Film({name: name, duration: duration});
       
  film.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Film: ' + film);
    films.push(film)
    cb(null, film)
  }  );
}

function hallsCreate(name, seatsAmount, cb) {
  var hall = new Hall({name: name, seats: seatsAmount});
       
  hall.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Hall: ' + hall);
    halls.push(hall)
    cb(null, hall)
  }  );
}


function sessionsCreate(film, hall, sessionDate, reservedSeats, price, cb) {
  var session = new Session({ film: film, hall: hall, sessionDate: sessionDate, reservedSeats: reservedSeats, price: price});    
  session.save(function (err) {
    if (err) {
      console.log('ERROR CREATING session: ' + session);
      cb(err, null)
      return
    }
    console.log('New Session: ' + session);
    sessions.push(session)
    cb(null, session)
  }  );
}


function createFilms(cb) {
  async.parallel([
    function(callback) {
      filmsCreate("Гарри Поттер и Философский камень", 120, callback)
    },
    function(callback) {
      filmsCreate("Хроники Риддика", 110, callback)
    },
    function(callback) {
      filmsCreate("Пьяный мастер", 130, callback)
    },
  ], cb) 
}

function createHalls(cb) {
  async.parallel([
    function(callback) {
      hallsCreate("Зал 1", 70, callback)
    },
    function(callback) {
      hallsCreate("Зал 2", 60, callback)
    },
    function(callback) {
      hallsCreate("Зал 3", 50, callback)
    },
  ], cb) 
}

function createSessions(cb) {

  async.parallel([
    function(callback) {
      sessionsCreate(films[0], halls[0], new Date(), [], 120, callback)
    },
    function(callback) {
      sessionsCreate(films[1], halls[1], new Date(), [], 150, callback)
    },
    function(callback) {
      sessionsCreate(films[2], halls[2], new Date(), [], 130, callback)
    },
  ], cb) 
}



async.series([
    createFilms,
    createHalls,
    createSessions,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+sessions);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




