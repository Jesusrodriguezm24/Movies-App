const request = require('supertest');
const app = require('../app');
require("../models");

let id;

test('Get /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /directors debe crear un director', async () => {
    const director = {
        firstName:"Jhon",
        lastName:"James",
        nationality: "USA",
        image: "kdsdskdlsdsdsds",
        birthday:2025
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(director.name);
    expect(res.body.id).toBeDefined();
});

test('Put /directors/:id debe actualizar un director', async () => {
    const director = {
        firstName:"Alfred",     
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);
});

test('Delete /directors/:id debe eliminar un director', async () => { 
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});