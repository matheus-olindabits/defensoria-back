const  { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Pessoa = require('./Pessoa');

class PessoaEndereco extends Model {
    static init(sequelize){
        super.init(
        {
            cep: Sequelize.INTEGER,
            logradouro : Sequelize.STRING,
            bairro : Sequelize.STRING,
            cidade: Sequelize.STRING,
            uf: Sequelize.STRING,
            numero: Sequelize.STRING,
            complemento: Sequelize.STRING,
            idPessoa: Sequelize.INTEGER
        },{
            sequelize, modelName: 'ENDERECO_PESSOA', // define o nome da tabela
            freezeTableName: true, // tira o s que o sequelize acrescenta 
            timestamps: true // por padrao em datas coloca a data do momento.
        });

        return this;
    }
}

module.exports = PessoaEndereco;