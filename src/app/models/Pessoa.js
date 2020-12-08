const  { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class Pessoa extends Model {
    static init(sequelize){
        super.init(
        {
            nome: Sequelize.STRING,
            cpf : Sequelize.INTEGER,
            rg : Sequelize.INTEGER,
            telefone: Sequelize.INTEGER,
            dataNascimento: Sequelize.STRING
        },{
            sequelize, modelName: 'PESSOA', // define o nome da tabela
            freezeTableName: true, // tira o s que o sequelize acrescenta 
            timestamps: true // por padrao em datas coloca a data do momento.
        });

        return this;

    }

    static associate(models){
        //this.belongsTo(File, { foreignKey: 'avatar_id' });
    }

}

module.exports = Pessoa;