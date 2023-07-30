const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require("../models");

let id;

test('Get /movies debe traer todas las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /movies debe crear una pelicula', async () => {
    const movie = {
        name:"Terminator",
        image:"dsdssdsdssds",
        synopsis:"",
        releaseYear: 1995,
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('Put /movies/:id debe actualizar una pelicula', async () => {
    const movie = {
        name:"Terminator 2",   
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('Post /movies/:id/actors debe crear los actores de un pelicula', async () => {
    const actor = await Actor.create({
        firstName:"Jhon",
        lastName:"James",
        nationality: "USA",
        image: "kdsdskdlsdsdsds",
        birthday:2025
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy(); 
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('Post /movies/:id/directors debe crear los directores de un pelicula', async () => {
    const director = await Director.create({
        firstName:"Jhon",
        lastName:"James",
        nationality: "USA",
        image: "kdsdskdlsdsdsds",
        birthday:2025
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy(); 
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('Post /movies/:id/genres debe crear los generos de un pelicula', async () => {
    const movie = await Genre.create({
        name:"Aventura",
    }) 
    const res = await request(app).post(`/movies/${id}/genres`).send([movie.id]);
    await movie.destroy();
    
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('Delete /movies/:id debe eliminar una pelicula', async () => { 
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});