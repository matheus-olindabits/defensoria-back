const express = require('express');
var app = express()
const cookieParser = require('cookie-parser');
var bodyparser = require("body-parser");
var cors = require("cors");

// Rotas dos models
const usuarioRota = require("./routes/usuario");
const pessoaRota = require("./routes/pessoa");
const assuntoRota = require("./routes/assunto");

const path = require('path');
const routes = require('./routes');
require('./database');

class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
    }

    routes(){
        // Definição das rotas por módulos
        this.server.use('/usuario', usuarioRota);
        this.server.use('/pessoa', pessoaRota);
        this.server.use('/assunto', assuntoRota);
    }
}

module.exports = new App().server;