const { Router } = require('express');
const AtendimentoController = require('../app/controllers/AtendimentoController');
const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();

routes.use(authMiddleware);

routes.post('/cadastro', AtendimentoController.CadastrarAtendimento);
routes.get('/listagem', AtendimentoController.listarAtendimentosEmAberto);
routes.get('/listagem/:id', AtendimentoController.obterAtendimento);
routes.get('/alterar-status/:idAtendimento/:status', AtendimentoController.alterarStatus);
routes.get('/historico-pessoa/:id', AtendimentoController.historicoAtendimentoPessoa);
routes.put('/alterar', AtendimentoController.alterarAtendimento);

module.exports = routes;