const { Router } = require('express');
const UsuarioController = require('../app/controllers/UsuarioController');
const SessionController = require('../app/controllers/SessionController');
//const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();

routes.post('/login', SessionController.login);
//routes.use(authMiddleware);

routes.post('/cadastro', UsuarioController.cadastroUsuario);
routes.get('/listagem', UsuarioController.listarUsuarios);
routes.get('/obter/:id', UsuarioController.obterUsuario);
routes.put('/alterar', UsuarioController.alterarUsuario);

module.exports = routes;