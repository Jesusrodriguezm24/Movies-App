const request = require('supertest');
const app = require('../app');
require("../models");

let id;

test('Get /genres debe traer todos los generos', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /genres debe crear un genero', async () => {
    const genre = {
        name:"Comedia",
    }
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(genre.name);
    expect(res.body.id).toBeDefined();
});

test('Put /genres/:id debe actualizar un genero', async () => {
    const genre = {
        name:"Accion",       
    }
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test('Delete /genres/:id debe eliminar un genero', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});