const { Router } = require('express');
const AtendimentoController = require('../app/controllers/AtendimentoController');
//const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();
//routes.use(authMiddleware);

routes.post('/cadastro', AtendimentoController.CadastrarAtendimento);
routes.get('/listagem', AtendimentoController.listarAtendimentos);

module.exports = routes;