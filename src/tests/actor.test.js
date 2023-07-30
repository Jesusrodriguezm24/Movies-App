const request = require('supertest');
const app = require('../app');
require("../models");

let id;

test('Get /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /actors debe crear un actor', async () => {
    const actor = {
        firstName:"Jhon",
        lastName:"James",
        nationality: "USA",
        image: "kdsdskdlsdsdsds",
        birthday:2025
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(actor.name);
    expect(res.body.id).toBeDefined();
});

test('Put /actors/:id debe actualizar un actor', async () => {
    const actor = {
        firstName:"Alfred",
        
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});


test('Delete /actors/:id debe eliminar un actor', async () => {
    
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);

});