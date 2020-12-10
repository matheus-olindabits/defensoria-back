const { Router } = require('express');
const PessoaController = require('../app/controllers/PessoaController');
//const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();
//routes.use(authMiddleware);

routes.get('/listagem', PessoaController.listarPessoas);

module.exports = routes;