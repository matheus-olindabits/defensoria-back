const  { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const Pessoa = require('./Pessoa');
const Usuario = require('./Usuario');
const Assunto = require('./Assunto');

class Atendimento extends Model {
    static init(sequelize){
        super.init(
        {
            titulo: Sequelize.STRING,
            observacao: Sequelize.TEXT,
            status: Sequelize.INTEGER,
            dataConclusao: Sequelize.DATEONLY,
            dataAtual: Sequelize.VIRTUAL,
            arquivo: Sequelize.STRING,
            idUsuario: Sequelize.INTEGER,
            idPessoa: Sequelize.INTEGER,
            idAssunto: Sequelize.INTEGER
        },{
            sequelize, modelName: 'ATENDIMENTO', // define o nome da tabela
            freezeTableName: true, // tira o s que o sequelize acrescenta 
            timestamps: true // por padrao em datas coloca a data do momento.
        });

        return this;
    }

    static associate(models){
        this.belongsTo(Pessoa, {as: 'pessoa', foreignKey: 'idPessoa'}); // hasOne -> object / hasMany -> array
        this.belongsTo(Usuario, {as: 'usuario', foreignKey: 'idUsuario'});
        this.belongsTo(Assunto, {as: 'assunto', foreignKey: 'idAssunto'});
    }

}

module.exports = Atendimento;