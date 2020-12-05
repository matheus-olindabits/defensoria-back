const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const UsuarioController = require('../app/controllers/UsuarioController');

const routes =  new Router();

routes.get('/', async (req,res) => {
    // variavel tem o nome da tabela que será criada
    return res.send('Hello World');
});

routes.post('/cadastro', UsuarioController.cadastroUsuario);

module.exports = routes;