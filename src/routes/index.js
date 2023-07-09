const express = require('express');
const genreRouter = require('./genre.router');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const movieRauter = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter);

router.use('/actors', actorRouter);

router.use('/directors', directorRouter);

router.use('/movies', movieRauter);

module.exports = router;