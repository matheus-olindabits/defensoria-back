const  { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
//const File = require('./File');

class Usuario extends Model {
    static init(sequelize){
        super.init(
        {
            nome: Sequelize.STRING,
            email : Sequelize.STRING,
            senha : Sequelize.STRING,
            senha_hash: Sequelize.VIRTUAL
        },{
            sequelize, modelName: 'USUARIO', // define o nome da tabela
            freezeTableName: true, // tira o s que o sequelize acrescenta 
            timestamps: true // por padrao em datas coloca a data do momento.
        });

        this.addHook('beforeCreate', async (usuario) => {
            if (usuario.senha){
                usuario.senha = await bcrypt.hash(usuario.senha, 8);
            }
        });

        return this;

    }

    static associate(models){
        //this.belongsTo(File, { foreignKey: 'avatar_id' });
    }

    verificaSenha(senha){
        return bcrypt.compare(senha, this.senha);
    }
}

module.exports = Usuario;