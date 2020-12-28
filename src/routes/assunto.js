const { Router } = require('express');
const AssuntoController = require('../app/controllers/AssuntoController');
const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();

routes.use(authMiddleware);

routes.post('/cadastro', AssuntoController.CadastrarAssunto);
routes.get('/listagem', AssuntoController.listarAssunto);
routes.put('/alterar', AssuntoController.alterarAssunto);

module.exports = routes;