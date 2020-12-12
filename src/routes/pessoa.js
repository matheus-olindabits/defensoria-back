const { Router } = require('express');
const PessoaController = require('../app/controllers/PessoaController');
//const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();
//routes.use(authMiddleware);

routes.post('/cadastro', PessoaController.cadastrarPessoa);
routes.get('/listagem', PessoaController.listarPessoas);
routes.get('/listagem/:id', PessoaController.obterPessoa);
routes.put('/alterar', PessoaController.alterarPessoa);
routes.put('/alterar-endereco', PessoaController.alterarEnderecoPessoa);
routes.post('/criar-endereco', PessoaController.criarEnderecoPessoa);

module.exports = routes;