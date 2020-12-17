const { request, response } = require('express');
const express = require('express');
const knex = require("./database/connection");
const Controller = require('./controllers/Controller');

const routes = express.Router();
const controller = new Controller();

routes.get('/clinicas/:table/:type', controller.getClinicas);
routes.get('/servicos', controller.getServicos);
routes.post('/createClinica', controller.createClinica);
// routes.get('/servicosByClinica/:id', controller.getServicosByClinica);

module.exports = routes;