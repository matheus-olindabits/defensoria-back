const { Router } = require('express');
const ExpressBrute  = require('express-brute');

const SessionController = require('../app/controllers/SessionController');

const routes =  new Router();

var store = new ExpressBrute.MemoryStore(); 
var bruteforce = new ExpressBrute(store);


routes.post('/login', bruteforce.prevent, SessionController.login);

module.exports = routes;