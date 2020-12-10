const Sequelize = require('sequelize');
const Usuario = require('../app/models/Usuario');
const Pessoa = require('../app/models/Pessoa');

const databaseConfig = require('../config/database');

const models = [Usuario, Pessoa];

class Database {
    constructor(){
        this.init();
    }

    init(){
        
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
        models.map(model => model.associate && model.associate(this.connection.models));

    }
}

module.exports = new Database();