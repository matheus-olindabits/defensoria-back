const  { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class Assunto extends Model {
    static init(sequelize){
        super.init(
        {
            nome: Sequelize.STRING,
            observacao : Sequelize.TEXT
        },{
            sequelize, modelName: 'ASSUNTO', // define o nome da tabela
            freezeTableName: true, // tira o s que o sequelize acrescenta 
            timestamps: true // por padrao em datas coloca a data do momento.
        });

        return this;
    }
}

module.exports = Assunto;