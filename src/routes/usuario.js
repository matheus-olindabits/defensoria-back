const { Router } = require('express');
const UsuarioController = require('../app/controllers/UsuarioController');
//const authMiddleware = require('../app/middlewares/auth');

const routes =  new Router();
//routes.use(authMiddleware);

routes.post('/cadastro', UsuarioController.cadastroUsuario);

module.exports = routes;