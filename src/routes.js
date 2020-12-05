const { Router } = require('express');

const routes =  new Router();

routes.get('/', async (req,res) => {
    // variavel tem o nome da tabela que será criada
    return res.send('Rota Ok');
})

module.exports = routes;