const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const UsuarioController = require('../app/controllers/UsuarioController');

const routes =  new Router();

routes.post('/cadastro', UsuarioController.cadastroUsuario);

module.exports = routes;