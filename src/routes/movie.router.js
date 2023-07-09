const { getAll, create, getOne, remove, update, setMovieGenres, setMovieActors, setMovieDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRauter = express.Router();

movieRauter.route('/')
    .get(getAll)
    .post(create);

movieRauter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRauter.route('/:id/genres')
    .post(setMovieGenres);

movieRauter.route('/:id/actors')
    .post(setMovieActors);

movieRauter.route('/:id/directors')
    .post(setMovieDirectors);

module.exports = movieRauter;